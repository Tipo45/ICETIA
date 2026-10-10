"use node"

import QRCode from "qrcode";

import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalAction } from "./_generated/server";
import { registrationConfirmationEmail, ticketEmail } from "./emailTemplate";

// Verify with Paystack first, then update Convex.
export const verifyAndConfirmPayment = action({
  args: {
    registrationId: v.id("registrations"),
    reference: v.string(),
  },

  handler: async (ctx, args) => {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      throw new Error("Paystack secret key is not configured.");
    }

    const registration = await ctx.runQuery(
      internal.payment.getRegistrationForPayment,
      {
        registrationId: args.registrationId,
      }
    );

    if (!registration) {
      throw new Error("Registration not found.");
    }

    // A successful transaction must match the saved reference.
    if (registration.paymentReference !== args.reference) {
      throw new Error("Payment reference does not match this registration.");
    }

    // Avoid treating an unrelated transaction as payment.
    if (registration.paymentStatus === "paid") {
      return {
        success: true,
        alreadyPaid: true,
        registrationId: args.registrationId,
      };
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        args.reference
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok || !result.status || !result.data) {
      throw new Error("Paystack could not verify this transaction.");
    }

    const transaction = result.data;

    if (transaction.status !== "success") {
      throw new Error("This payment has not been confirmed as successful.");
    }

    if (transaction.reference !== args.reference) {
      throw new Error("The verified reference does not match.");
    }

    // The stored registration amount is in naira; Paystack uses kobo.
    const expectedAmountInKobo = Math.round(registration.amount * 100);

    if (transaction.amount !== expectedAmountInKobo) {
      throw new Error("The payment amount does not match the registration fee.");
    }

    if (transaction.currency !== "NGN") {
      throw new Error("The payment currency is incorrect.");
    }

    if (
      transaction.customer?.email?.toLowerCase() !==
      registration.email.toLowerCase()
    ) {
      throw new Error("The payment email does not match the registration.");
    }

    // Only after every check passes do we update the database.
    await ctx.runMutation(internal.payment.markPaymentAsPaid, {
      registrationId: args.registrationId,
      paymentReference: args.reference,
      paidAt: transaction.paid_at
        ? new Date(transaction.paid_at).getTime()
        : Date.now(),
    });


    return {
      success: true,
      alreadyPaid: false,
      registrationId: args.registrationId,
    };
  },
});

export const sendPaidConfirmation = internalAction({
  args: {
    registrationId: v.id("registrations"),
  },

  handler: async (ctx, args) => {
    const registration = await ctx.runQuery(
      internal.registration.getRegistrationForEmail,
      {
        registrationId: args.registrationId,
      }
    );

    if (!registration) {
      throw new Error("Registration not found.");
    }

    // Never send a paid confirmation for an unpaid registration.
    if (registration.paymentStatus !== "paid") {
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.EMAIL_FROM;

    if (!apiKey || !fromEmail) {
      throw new Error("Email environment variables are missing.");
    }

    const emailText = registrationConfirmationEmail({
  firstName: registration.firstName,
  lastName: registration.lastName,
  email: registration.email,
  category: registration.category,
  amountPaid: registration.amount,
  coAuthors: registration.coAuthors,
});

const response = await fetch(
  "https://api.resend.com/emails",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [registration.email],
      subject: "ICETIA 2027 — Payment Confirmation",
      text: emailText,
    }),
  }
);

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to send confirmation email: ${errorDetails}`);
    }
    await ctx.runMutation(
      internal.payment.markConfirmationEmailSent,
      {
        registrationId: args.registrationId,
      }
    );

    return { success: true };
  },
});

export const sendTicketEmail = internalAction({
  args: {
    registrationId: v.id("registrations"),
  },

  handler: async (ctx, args) => {
    const registration = await ctx.runQuery(
      internal.payment.getRegistrationForPayment,
      {
        registrationId: args.registrationId,
      }
    );

    if (!registration) {
      throw new Error("Registration not found.");
    }

    // Never issue a ticket for an unpaid registration.
    if (registration.paymentStatus !== "paid") {
      return { success: false, reason: "Registration is not paid." };
    }

    // Avoid sending the ticket twice.
    if (registration.ticketSent === true) {
      return { success: true, alreadySent: true };
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.EMAIL_FROM;

    if (!apiKey || !fromEmail) {
      throw new Error("Email environment variables are missing.");
    }

    const registrationNumber =
  registration.registrationNumber ?? registration._id;

// Create a QR code containing the registration identifier.
const qrCode = await QRCode.toDataURL(
  JSON.stringify({
    event: "ICETIA 2027",
    registrationNumber,
  }),
  {
    width: 300,
    margin: 2,
    errorCorrectionLevel: "M",
  }
);

const qrCodeBase64 = qrCode.replace(/^/, "");

const emailHtml = ticketEmail({
  firstName: registration.firstName,
  registrationNumber,
  qrCode: "cid:conference-qr",
});

const response = await fetch(
  "https://api.resend.com/emails",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [registration.email],
      subject: "Your ICETIA 2027 Conference Ticket",
      html: emailHtml,
    attachments: [
      {
        filename: "icetia-2027-ticket-qr.png",
        content: qrCodeBase64,
        content_type: "image/png",
        content_id: "conference-qr",
      },
    ],
  }),
});

const result = await response.json();

if (!response.ok) {
  console.error("Resend error:", result);
  const details = await response.text();
  // throw new Error(`Ticket email failed: ${details}`);
  throw new Error(
    `Ticket email failed: ${JSON.stringify(result)}`
  );
}

console.log("Resend email response:", result);

// Keep your existing ticketEmailSent update here.

    // Record successful email-provider acceptance.
    await ctx.runMutation(
      internal.payment.markTicketEmailSent,
      {
        registrationId: args.registrationId,
      }
    );

    return { success: true };
  },
});

"use node"

import QRCode from "qrcode";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalAction } from "./_generated/server";
import { editorInvite, registrationConfirmationEmail, reviewerInvite, ticketEmail } from "./emailTemplate";
import { createHash } from "node:crypto";

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
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    // console.log("PAYSTACK VERIFICATION RESULT:", {
    //   amount: result.data?.amount,
    //   requestedAmount: result.data?.requested_amount,
    //   fees: result.data?.fees,
    //   channel: result.data?.channel,
    //   currency: result.data?.currency,
    //   gatewayResponse: result.data?.gateway_response,
    //   httpStatus: response.status,
    //   apiStatus: result.status,
    //   message: result.message,
    //   transactionStatus: result.data?.status,
    //   reference: result.data?.reference,
    // });



    if (!response.ok || !result.status || !result.data) {
      throw new Error(
        `Paystack verification API failed: ${result.message || "Unknown error"
        }`
      );
    }

    const transaction = result.data;

    if (transaction.status !== "success") {
      throw new Error(
        `This payment has not been confirmed as successful. Status: ${transaction.status}`
      );
    }

    if (transaction.reference !== args.reference) {
      throw new Error("The verified reference does not match.");
    }

    // The stored registration amount is in naira; Paystack uses kobo.
    const expectedAmountInKobo = Math.round(registration.amount * 100);

    const actualRequestedAmount =
      transaction.requested_amount ?? transaction.amount;

    // const expectedAmountInKobo = Math.round(100 * 10);
    // console.log("AMOUNT COMPARISON:", {
    //   registrationAmount: registration.amount,
    //   expectedAmountInKobo,
    //   paystackAmount: transaction.amount,
    //   requestedAmount: transaction.requested_amount,
    //   actualRequestedAmount,
    //   fees: transaction.fees,
    //   matches: actualRequestedAmount === expectedAmountInKobo,
    // });

    if (actualRequestedAmount !== expectedAmountInKobo) {
      throw new Error(
        `Amount mismatch. Expected ${expectedAmountInKobo} kobo, received ${actualRequestedAmount} kobo.`
      );
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
      registrationNumber: registration.registrationNumber,
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

    // const qrCodeBase64 = qrCode.replace(/^/, "");

    const qrCodeBase64 = qrCode.replace(
      /^data:image\/png;base64,/,
      ""
    );

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

export const validatePaperSubmissionSession = action({
  args: {
    sessionToken: v.string(),
  },

  handler: async (ctx, args): Promise<{ valid: boolean }> => {
    if (!args.sessionToken) {
      return { valid: false };
    }

    const sessionTokenHash = createHash("sha256")
      .update(args.sessionToken)
      .digest("hex");

    const valid = await ctx.runQuery(
      internal.registration.validatePaperSubmissionSession,
      { sessionTokenHash }
    );

    return { valid };
  },
});

export const sendTeamMemberInvitationEmail = internalAction({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("editor"),
      v.literal("reviewer")
    ),
  },

  handler: async (ctx, args) => {
    const roleName =
      args.role === "editor" ? "Editor" : "Reviewer";

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.EMAIL_FROM;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured.");
    }

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
          to: [args.email],
          subject: `Invitation to Join ICETIA 2027 as a ${roleName}`,
          html: args.role === "editor" ? editorInvite({
            name: args.name,
            role: roleName,
          }) : reviewerInvite({
            name: args.name,
            role: roleName,
          }),
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend invitation error:", result);

      throw new Error(
        result.message || "Failed to send invitation email."
      );
    }

    return {
      success: true,
      emailId: result.id,
    };
  },
});

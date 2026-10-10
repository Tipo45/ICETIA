import { v } from "convex/values";
import {
  internalMutation,
  internalQuery,
  mutation,
} from "./_generated/server";
import { internal } from "./_generated/api";

// Read the registration securely from inside Convex.
export const getRegistrationForPayment = internalQuery({
  args: {
    registrationId: v.id("registrations"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.registrationId);
  },
});

// Save the Paystack reference returned during payment initialization.
// This does NOT mark the registration as paid.
export const savePaymentReference = mutation({
  args: {
    registrationId: v.id("registrations"),
    paymentReference: v.string(),
  },

  handler: async (ctx, args) => {
    const registration = await ctx.db.get(args.registrationId);

    if (!registration) {
      throw new Error("Registration not found.");
    }

    if (registration.paymentStatus === "paid") {
      throw new Error("This registration has already been paid for.");
    }

    await ctx.db.patch(args.registrationId, {
      paymentReference: args.paymentReference,
      paymentStatus: "pending",
    });

    return { success: true };
  },
});

// Only this internal mutation can mark a registration as paid.
export const markPaymentAsPaid = internalMutation({
  args: {
    registrationId: v.id("registrations"),
    paymentReference: v.string(),
    paidAt: v.number(),
  },

  handler: async (ctx, args) => {
    const registration = await ctx.db.get(args.registrationId);

    if (!registration) {
      throw new Error("Registration not found.");
    }

    // Make repeated verification requests safe.
    if (registration.paymentStatus === "paid") {
      if (registration.paymentReference !== args.paymentReference) {
        throw new Error(
          "This registration was already paid using another reference."
        );
      }

      return { success: true, alreadyPaid: true };
    }

    // Ensure the reference belongs to the current payment attempt.
    if (registration.paymentReference !== args.paymentReference) {
      throw new Error("Payment reference does not match the registration.");
    }

    await ctx.db.patch(args.registrationId, {
      paymentStatus: "paid",
      paymentReference: args.paymentReference,
      paidAt: args.paidAt,
    });

    await ctx.scheduler.runAfter(
      0, internal.verify.sendPaidConfirmation,
      {
        registrationId: args.registrationId,
      }
    )

    return { success: true, alreadyPaid: false };
  },
});

export const markConfirmationEmailSent = internalMutation({
  args: {
    registrationId: v.id("registrations"),
  },

  handler: async (ctx, args) => {
    const registration = await ctx.db.get(args.registrationId);

    if (!registration) {
      throw new Error("Registration not found.");
    }

    // Prevent scheduling the ticket email repeatedly.
    if (registration.confirmationEmailSent) {
      return { success: true, alreadySent: true };
    }

    await ctx.db.patch(args.registrationId, {
      confirmationEmailSent: true,
    });

    // Send the ticket email 2 minutes later.
    await ctx.scheduler.runAfter(
      120_000,
      internal.verify.sendTicketEmail,
      {
        registrationId: args.registrationId,
      }
    );

    return { success: true, alreadySent: false };
  },
});

export const markTicketEmailSent = internalMutation({
  args: {
    registrationId: v.id("registrations"),
  },

  handler: async (ctx, args) => {
    const registration = await ctx.db.get(args.registrationId);

    if (!registration) {
      throw new Error("Registration not found.");
    }

    if (registration.paymentStatus !== "paid") {
      throw new Error("Cannot mark a ticket sent for an unpaid registration.");
    }

    await ctx.db.patch(args.registrationId, {
      ticketSent: true,
    });

    return { success: true };
  },
});
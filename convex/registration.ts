import { v } from "convex/values";
import { internalAction, mutation } from "./_generated/server";
import { components, internal } from "./_generated/api";
import { ConvexError } from "convex/values";
import { Resend } from "@convex-dev/resend";
import { Resend as ResendSdk } from "resend";

export const register = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),

        category: v.union(
            v.literal("author"),
            v.literal("co-author"),
            v.literal("participant"),
            v.literal("student")
        ),

        amount: v.number(),
    },

    handler: async (ctx, args) => {
        const registrationNumber = `ICETIA2026-${crypto
            .randomUUID()
            .slice(0, 8)
            .toUpperCase()}`;

        const amountMap = {
            author: 30000,
            "co-author": 30000,
            participant: 30000,
            student: 20000,
        } as const;

        const amount = amountMap[args.category];


        const existing = await ctx.db
            .query("registrations")
            .withIndex("by_email", q => q.eq("email", args.email))
            .unique();


        if (existing?.paymentStatus === "paid") {
            throw new ConvexError("This email has already completed registration.");
        }

        if (existing?.paymentStatus === "pending") {
            throw new ConvexError("A payment is already pending for this email.");
        }

        return await ctx.db.insert("registrations", {
            registrationNumber,

            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,

            category: args.category,
            amount,

            paymentStatus: "pending",

            paymentReference: undefined,
            paidAt: undefined,

            ticketSent: false,
            confirmationEmailSent: false,
        });
    },
});

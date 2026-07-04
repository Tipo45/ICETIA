import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { Resend } from "@convex-dev/resend";
import { api, components } from "./_generated/api";
import QRCode from "qrcode";
import { registrationConfirmationEmail, ticketEmail } from "./emailTemplate";

export const resend: Resend = new Resend(components.resend, {
    testMode: false,
});

export const register = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        category: v.union(
            v.literal("author"),
            v.literal("participant"),
            v.literal("student")
        ),
        institution: v.string(),
        country: v.string(),
        department: v.string(),
        degree: v.optional(v.union(
            v.literal("BSc"),
            v.literal("MSc"),
            v.literal("MPhil"),
            v.literal("PhD"),
            v.literal("Professor"),
            v.literal("Other")
        )),
        paperTitle: v.string(),
        coAuthors: v.array(v.object({
            firstName: v.string(),
            lastName: v.string(),
            email: v.string(),
            institution: v.string(),
            country: v.optional(v.string()),
            department: v.optional(v.string()),
            degree: v.optional(v.union(
                v.literal("BSc"),
                v.literal("MSc"),
                v.literal("MPhil"),
                v.literal("PhD"),
                v.literal("Professor"),
                v.literal("Other")
            )),
        })),

    },

    handler: async (ctx, args) => {
        const registrationNumber = `ICETIA2026-${crypto
            .randomUUID()
            .slice(0, 8)
            .toUpperCase()}`;

        const amountMap = {
            "author": 30000,
            "participant": 30000,
            "student": 20000,
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

        const registrationId = await ctx.db.insert("registrations", {
            registrationNumber,

            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            category: args.category,
            institution: args.institution,
            country: args.country,
            degree: args.degree,
            paperTitle : args.paperTitle,
            coAuthors: args.coAuthors,
            department: args.department,
            amount,

            paymentStatus: "pending",

            paymentReference: undefined,
            paidAt: undefined,

            ticketSent: false,
            confirmationEmailSent: false,
        });

        return { registrationId, registrationNumber };
    },
});

export const sendMail = mutation({
    args: {
        registrationId: v.id("registrations"),
    },
    handler: async (ctx, args) => {

        const registration = await ctx.db.get(args.registrationId);

        if (!registration) {
            throw new ConvexError("Registration not found.");
        }

        const existing = await ctx.db
            .query("registrations")
            .withIndex("by_email", q => q.eq("email", registration.email))
            .unique();

        if (!existing) {
            throw new ConvexError("No registration found for this email.");
        }

        const subject = "ICETIA 2026 Registration Confirmation";

        const body = registrationConfirmationEmail({
            firstName: existing.firstName,
            lastName: existing.lastName,
            email: existing.email,
            category: existing.category,
            amountPaid: existing.amount,
        });

        await resend.sendEmail(ctx, {
            from: "ICETIA <icetia@resend.dev>",
            to: registration.email,
            subject: subject,
            text: body,
        });

        await ctx.db.insert("emails", {
            to: registration.email,
            subject: subject,
            body,
        });

        await ctx.db.patch(registration._id, {
            confirmationEmailSent: true,
        });

        await ctx.scheduler.runAfter(
            2 * 60 * 1000,
            api.registration.sendConferenceTicket,
            {
                registrationId: registration._id,
            }
        );

    }
});

export const sendConferenceTicket = mutation({
    args: {
        registrationId: v.id("registrations"),
    },

    handler: async (ctx, args) => {
        const registration = await ctx.db.get(args.registrationId);


        if (!registration) {
            throw new ConvexError("Registration not found.");
        }

        const qrCode =
            `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                registration.registrationNumber
            )}`;

        const subject = "Your ICETIA 2026 Conference Ticket";

        const body = ticketEmail({
            registrationNumber: registration.registrationNumber,
            qrCode,
        });

        await resend.sendEmail(ctx, {
            from: "ICETIA <icetia@resend.dev>",
            to: registration.email,
            subject: subject,
            html: body,
        });

        await ctx.db.patch(registration._id, {
            ticketSent: true,
        });
    },
});
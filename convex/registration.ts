import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { Resend } from "@convex-dev/resend";
import { api, components } from "./_generated/api";
import { registrationConfirmationEmail, reminderEmail, ticketEmail } from "./emailTemplate";

export const resend: Resend = new Resend(components.resend, {
    testMode: false,
});

export const registerAuthor = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        institution: v.optional(v.string()),
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
        paperTitle: v.optional(v.string()),
        paperFileId: v.optional(v.id("_storage")),
        coAuthors: v.optional(v.array(v.object({
            firstName: (v.string()),
            lastName: (v.string()),
            email: (v.string()),
            institution: (v.string()),
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
        }))),

    },

    handler: async (ctx, args) => {
        const registrationNumber = `ICETIA2027-${crypto
            .randomUUID()
            .slice(0, 8)
            .toUpperCase()}`;



        const amount = 40000;


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
            category: "author",
            institution: args.institution,
            country: args.country,
            degree: args.degree,
            paperTitle: args.paperTitle,
            paperFileId: args.paperFileId,
            coAuthors: args.coAuthors ?? [],
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

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const registerParticipant = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        institution: v.string(),
        country: v.string(),
    },
    handler: async (ctx, args) => {

        const registrationNumber = `ICETIA2027-${crypto
            .randomUUID()
            .slice(0, 8)
            .toUpperCase()}`;

        const amount = 40000;

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
            institution: args.institution,
            country: args.country,
            category: "participant",
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

export const registerStudent = mutation({
    args: {
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        department: v.string(),
        institution: v.string(),
        country: v.string(),
    },
    handler: async (ctx, args) => {

        const registrationNumber = `ICETIA2027-${crypto
            .randomUUID()
            .slice(0, 8)
            .toUpperCase()}`;

        const amount = 35000;

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
            department: args.department,
            institution: args.institution,
            country: args.country,
            category: "student",
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

        const subject = "ICETIA 2027 Registration Confirmation";

        const body = registrationConfirmationEmail({
            firstName: existing.firstName,
            lastName: existing.lastName,
            email: existing.email,
            category: existing.category,
            amountPaid: existing.amount,
            coAuthors: existing.coAuthors,
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

        const subject = "Your ICETIA 2027 Conference Ticket";

        const body = ticketEmail({
            firstName: registration.firstName,
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

export const getParticipants = query({
    args: {
        search: v.optional(v.string()),
        category: v.optional(
            v.union(
                v.literal("author"),
                v.literal("participant"),
                v.literal("student")
            )
        ),
        country: v.optional(v.string()),
        paymentDate: v.optional(v.number()),
    },

    handler: async (ctx, args) => {

        let participants = await ctx.db
            .query("registrations")
            .withIndex("by_payment_status", q =>
                q.eq("paymentStatus", "paid")
            )
            .collect();

        if (args.search) {
            const search = args.search.toLowerCase();

            participants = participants.filter(p =>
                p.firstName.toLowerCase().includes(search) ||
                p.lastName.toLowerCase().includes(search) ||
                p.email.toLowerCase().includes(search) ||
                p.registrationNumber.toLowerCase().includes(search)
            );
        }

        if (args.category) {
            participants = participants.filter(
                p => p.category === args.category
            );
        }

        if (args.country) {
            participants = participants.filter(
                p => p.country === args.country
            );
        }

        if (args.paymentDate) {
            const selected = new Date(args.paymentDate);

            participants = participants.filter(p => {
                if (!p.paidAt) return false;

                const paid = new Date(p.paidAt);

                return (
                    paid.getFullYear() === selected.getFullYear() &&
                    paid.getMonth() === selected.getMonth() &&
                    paid.getDate() === selected.getDate()
                );
            });
        }

        return Promise.all(
      participants.map(async (participant) => ({
        ...participant,
        paperUrl: participant.paperFileId
          ? await ctx.storage.getUrl(participant.paperFileId)
          : null,
      }))
    );
  },
});

export const sendReminder = mutation({
    args: {
        registrationId: v.id("registrations"),
    },

    handler: async (ctx, args) => {
        const registration = await ctx.db.get(args.registrationId);

        if (!registration) {
            throw new ConvexError("Participant not found.");
        }

        const existing = await ctx.db
            .query("registrations")
            .withIndex("by_email", q => q.eq("email", registration.email))
            .unique();

        if (!existing) {
            throw new ConvexError("No registration found for this email.");
        }

        const subject = "ICETIA 2027 Conference Reminder";

        const body = reminderEmail({
            firstName: existing.firstName,
            registrationNumber: existing.registrationNumber,
        })

        await resend.sendEmail(ctx, {
            from: "ICETIA <icetia@resend.dev>",
            to: registration.email,
            subject: subject,
            text: body,
        });
    },
});
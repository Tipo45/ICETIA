import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { Resend } from "@convex-dev/resend";
import { api, components } from "./_generated/api";
import { registrationConfirmationEmail, reminderEmail, ticketEmail, verifyId } from "./emailTemplate";
import { createHash, randomInt } from "crypto";

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
        paperTrack: v.optional(v.string()),
        paperTitle: v.optional(v.string()),
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
            category: "author",
            institution: args.institution,
            country: args.country,
            degree: args.degree,
            paperTrack: args.paperTrack,
            paperTitle: args.paperTitle,
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

        const amount = 25000;

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
            from: "icetia <conference@icetiaconference.org>",
            to: registration.email,
            subject: subject,
            text: body,
        });

        // await ctx.db.insert("emails", {
        //     to: registration.email,
        //     subject: subject,
        //     body,
        // });

        // await ctx.db.patch(registration._id, {
        //     confirmationEmailSent: true,
        // });

        // await ctx.scheduler.runAfter(
        //     2 * 60 * 1000,
        //     api.registration.sendConferenceTicket,
        //     {
        //         registrationId: registration._id,
        //     }
        // );

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
            from: "icetia <conference@icetiaconference.org>",
            to: registration.email,
            subject: subject,
            html: body,
        });

        await ctx.db.patch(registration._id, {
            ticketSent: true,
        });
    },
});

export const getRegistrationForEmail = internalQuery({
    args: {
        registrationId: v.id("registrations"),
    },

    handler: async (ctx, args) => {
        const registration = await ctx.db.get(
            args.registrationId
        );

        if (!registration) return null;

        return {
            _id: registration._id,
            firstName: registration.firstName,
            lastName: registration.lastName,
            email: registration.email,
            category: registration.category,
            amount: registration.amount,
            coAuthors: registration.coAuthors,
            paymentStatus: registration.paymentStatus,
        };
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
        token: v.string(),
    },

    handler: async (ctx, args) => {

        const tokenHash = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(args.token)
        );

        const tokenHashHex = Array.from(new Uint8Array(tokenHash))
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");

        const session = await ctx.db
            .query("adminSessions")
            .withIndex("by_tokenHash", (q) =>
                q.eq("tokenHash", tokenHashHex)
            )
            .unique();

        if (!session || session.expiresAt <= Date.now()) {
            throw new ConvexError("Unauthorized: admin login required.");
        }

        const admin = await ctx.db.get(session.adminId);

        if (!admin) {
            throw new ConvexError("Unauthorized: admin not found.");
        }

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
            from: "icetia <conference@icetiaconference.org>",
            to: registration.email,
            subject: subject,
            text: body,
        });

        return { success: true };
    },
});

export const createAdmin = internalMutation({
    args: {
        email: v.string(),
        passwordHash: v.string(),
    },

    handler: async (ctx, args) => {
        const existingAdmin = await ctx.db
            .query("admins")
            .withIndex("by_email", (q) =>
                q.eq("email", args.email)
            )
            .unique();

        if (existingAdmin) {
            throw new Error("An admin with this email already exists");
        }

        return await ctx.db.insert("admins", {
            email: args.email,
            passwordHash: args.passwordHash,
        });
    },
});

export const getAdminByEmail = internalQuery({
    args: {
        email: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db
            .query("admins")
            .withIndex("by_email", (q) =>
                q.eq("email", args.email)
            )
            .unique();
    },
});

export const createAdminSession = internalMutation({
    args: {
        adminId: v.id("admins"),
        tokenHash: v.string(),
        expiresAt: v.number(),
    },

    handler: async (ctx, args) => {
        return await ctx.db.insert("adminSessions", {
            adminId: args.adminId,
            tokenHash: args.tokenHash,
            expiresAt: args.expiresAt,
        });
    },
});

export const getAdminSessionByTokenHash = internalQuery({
    args: {
        tokenHash: v.string(),
    },

    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("adminSessions")
            .withIndex("by_tokenHash", (q) =>
                q.eq("tokenHash", args.tokenHash)
            )
            .unique();

        if (!session || session.expiresAt <= Date.now()) {
            return null;
        }

        const admin = await ctx.db.get(session.adminId);

        if (!admin) {
            return null;
        }

        return {
            adminId: admin._id,
            email: admin.email,
        };
    },
});

export const submitPaper = mutation({
    args: {
        registrationNumber: v.string(),
        paperTrack: v.string(),
        paperTitle: v.string(),
        abstract: v.string(),
        paperFileId: v.id("_storage"),
        sessionToken: v.string(),
    },

    handler: async (ctx, args) => {

        // 1. Check whether the registration exists
        const registration = await ctx.db.query("registrations")
            .withIndex("by_registration_number", (q) =>
                q.eq("registrationNumber", args.registrationNumber)
            ).unique();

        if (!registration) {
            throw new ConvexError(
                "Invalid registration Number. Please check your registration details."
            );
        }

        const registrationId = registration._id;

        const session = await ctx.db
            .query("paperSubmissionSessions")
            .withIndex("by_registration", (q) =>
                q.eq("registrationId", registrationId)
            )
            .unique();

        if (!session || session.expiresAt === Date.now() || session.used === true) {
            throw new ConvexError(
                "Your verification session has expired. Please verify your registration again."
            );
        }

        // 2. Check whether the registrant is an author
        if (registration.category !== "author") {
            throw new ConvexError(
                "Only registered authors can submit papers."
            );
        }

        // 3. Check whether payment has been confirmed
        if (registration.paymentStatus !== "paid") {
            throw new ConvexError(
                "Your registration payment has not been confirmed. Please complete payment before submitting a paper."
            );
        }

        // 4. Prevent multiple papers under the same track
        const existingPaper = await ctx.db
            .query("submittedPapers")
            .withIndex("by_registration_and_track", (q) =>
                q
                    .eq("registrationId", registrationId)
                    .eq("paperTrack", args.paperTrack)
            )
            .first();

        if (existingPaper) {
            throw new ConvexError(
                "You have already submitted a paper under this track."
            );
        }

        // 5. Save the paper
        const paperId = await ctx.db.insert("submittedPapers", {
            registrationId,
            paperTrack: args.paperTrack,
            paperTitle: args.paperTitle,
            abstract: args.abstract,
            paperFileId: args.paperFileId,
            status: "under_review",
        });

        await ctx.db.patch(session._id, {
            used: true,
        });

        return {
            success: true,
            paperId,
            message: "Your paper has been submitted successfully.",
        };
    },
});

export const submitWorkshopPaper = mutation({
    args: {
        registrationNumber: v.string(),
        paperTrack: v.string(),
        paperTitle: v.string(),
        abstract: v.string(),
        paperFileId: v.id("_storage"),
        sessionToken: v.string(),
    },

    handler: async (ctx, args) => {

        // 1. Check whether the registration exists
        const registration = await ctx.db.query("registrations")
            .withIndex("by_registration_number", (q) =>
                q.eq("registrationNumber", args.registrationNumber)
            ).unique();

        if (!registration) {
            throw new ConvexError(
                "Invalid registration Number. Please check your registration details."
            );
        }

        const registrationId = registration._id;

        const session = await ctx.db
            .query("paperSubmissionSessions")
            .withIndex("by_registration", (q) =>
                q.eq("registrationId", registrationId)
            )
            .unique();

        if (!session || session.expiresAt === Date.now() || session.used === true) {
            throw new ConvexError(
                "Your verification session has expired. Please verify your registration again."
            );
        }

        // 2. Check whether the registrant is an author
        if (registration.category !== "author") {
            throw new ConvexError(
                "Only registered authors can submit papers."
            );
        }

        // 3. Check whether payment has been confirmed
        if (registration.paymentStatus !== "paid") {
            throw new ConvexError(
                "Your registration payment has not been confirmed. Please complete payment before submitting a paper."
            );
        }

        // 4. Prevent multiple papers under the same track
        const existingPaper = await ctx.db
            .query("submittedWorkShopPapers")
            .withIndex("by_registration_and_track", (q) =>
                q
                    .eq("registrationId", registrationId)
                    .eq("paperTrack", args.paperTrack)
            )
            .first();

        if (existingPaper) {
            throw new ConvexError(
                "You have already submitted a paper under this track."
            );
        }

        // 5. Save the paper
        const paperId = await ctx.db.insert("submittedWorkShopPapers", {
            registrationId,
            paperTrack: args.paperTrack,
            paperTitle: args.paperTitle,
            abstract: args.abstract,
            paperFileId: args.paperFileId,
            status: "under_review",
        });

        await ctx.db.patch(session._id, {
            used: true,
        });

        return {
            success: true,
            paperId,
            message: "Your paper has been submitted successfully.",
        };
    },
});

export const getEligibleRegistration = internalQuery({
    args: {
        registrationNumber: v.string(),
    },

    handler: async (ctx, args) => {
        const registration = await ctx.db
            .query("registrations")
            .withIndex("by_registration_number", (q) =>
                q.eq("registrationNumber", args.registrationNumber)
            )
            .unique();

        if (!registration) {
            throw new Error("Registration number not found.");
        }

        if (registration.category !== "author") {
            throw new Error("Only registered authors can submit papers.");
        }

        if (registration.paymentStatus !== "paid") {
            throw new Error("Payment must be confirmed before paper submission.");
        }

        return {
            registrationId: registration._id,
            registrationNumber: registration.registrationNumber,
            email: registration.email,
        };
    },
});

export const getRegistrationForOtp = internalQuery({
    args: {
        registrationNumber: v.string(),
    },

    handler: async (ctx, args) => {
        return await ctx.db
            .query("registrations")
            .withIndex("by_registration_number", (q) =>
                q.eq("registrationNumber", args.registrationNumber)
            )
            .unique();
    },
});

export const verifyAndCreatePaperSubmissionSession = internalMutation({
    args: {
        registrationNumber: v.string(),
        otpHash: v.string(),
        sessionTokenHash: v.string(),
        sessionExpiresAt: v.number(),
        used: v.boolean(),
    },

    handler: async (ctx, args) => {
        const registration = await ctx.db
            .query("registrations")
            .withIndex("by_registration_number", (q) =>
                q.eq("registrationNumber", args.registrationNumber)
            )
            .unique();

        if (
            !registration ||
            registration.category !== "author" ||
            registration.paymentStatus !== "paid"
        ) {
            return {
                success: false,
                message: "Registration is not eligible for paper submission.",
            };
        }

        const otpRecord = await ctx.db
            .query("paperSubmissionOtps")
            .withIndex("by_registration", (q) =>
                q.eq("registrationId", registration._id)
            )
            .first();

        if (!otpRecord || otpRecord.verified) {
            return {
                success: false,
                message: "No valid pending OTP found. Please request a new code.",
            };
        }

        if (otpRecord.expiresAt <= Date.now()) {
            await ctx.db.delete(otpRecord._id);

            return {
                success: false,
                message: "Your OTP has expired. Please request a new code.",
            };
        }

        if (otpRecord.attempts >= 5) {
            await ctx.db.delete(otpRecord._id);

            return {
                success: false,
                message: "Too many incorrect attempts. Please request a new code.",
            };
        }

        if (otpRecord.otpHash !== args.otpHash) {
            const attempts = otpRecord.attempts + 1;

            await ctx.db.patch(otpRecord._id, { attempts });

            return {
                success: false,
                message:
                    attempts >= 5
                        ? "Too many incorrect attempts. Please request a new code."
                        : `Incorrect OTP. ${5 - attempts} attempt(s) remaining.`,
            };
        }

        // OTP is correct. Mark it as used.
        await ctx.db.patch(otpRecord._id, { verified: true });

        await ctx.db.insert("paperSubmissionSessions", {
            registrationId: registration._id,
            sessionTokenHash: args.sessionTokenHash,
            expiresAt: args.sessionExpiresAt,
            createdAt: Date.now(),
            used: false,
        });

        return { success: true };
    },
});

export const storePaperSubmissionOtp = internalMutation({
    args: {
        registrationId: v.id("registrations"),
        registrationNumber: v.string(),
        email: v.string(),
        otpHash: v.string(),
        expiresAt: v.number(),
    },

    handler: async (ctx, args) => {
        const registration = await ctx.db.get(args.registrationId);

        if (
            !registration ||
            registration.registrationNumber !== args.registrationNumber ||
            registration.category !== "author" ||
            registration.paymentStatus !== "paid"
        ) {
            throw new Error("Registration is not eligible for paper submission.");
        }

        // Invalidate existing OTPs for this registration.
        const existingOtps = await ctx.db
            .query("paperSubmissionOtps")
            .withIndex("by_registration", (q) =>
                q.eq("registrationId", args.registrationId)
            )
            .collect();

        for (const otp of existingOtps) {
            await ctx.db.delete(otp._id);
        }

        await ctx.db.insert("paperSubmissionOtps", {
            registrationId: args.registrationId,
            registrationNumber: args.registrationNumber,
            email: args.email,
            otpHash: args.otpHash,
            expiresAt: args.expiresAt,
            verified: false,
            attempts: 0,
            createdAt: Date.now(),
        });
    },
});

export const clearPaperSubmissionOtps = internalMutation({
    args: {
        registrationId: v.id("registrations"),
    },

    handler: async (ctx, args) => {
        const existingOtps = await ctx.db
            .query("paperSubmissionOtps")
            .withIndex("by_registration", (q) =>
                q.eq("registrationId", args.registrationId)
            )
            .collect();

        for (const otp of existingOtps) {
            if (!otp.verified) {
                await ctx.db.delete(otp._id);
            }
        }
    },
});

export const validatePaperSubmissionSession = internalQuery({
    args: {
        sessionTokenHash: v.string(),
    },

    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("paperSubmissionSessions")
            .withIndex("by_session_token_hash", (q) =>
                q.eq("sessionTokenHash", args.sessionTokenHash)
            )
            .unique();

        if (!session || session.expiresAt <= Date.now()) {
            return false;
        }

        const registration = await ctx.db.get(session.registrationId);

        return Boolean(
            registration &&
            registration.category === "author" &&
            registration.paymentStatus === "paid"
        );
    },
});
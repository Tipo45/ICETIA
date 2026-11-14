import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { Resend } from "@convex-dev/resend";
import { components } from "./_generated/api";
import { registrationConfirmationEmail, reminderEmail, ticketEmail, verifyId } from "./emailTemplate";
import { Id } from "./_generated/dataModel";
import { Email } from "@convex-dev/auth/providers/Email";
import { Resend as ResendAPI } from "resend";
import {
    RandomReader,
    generateRandomString,
} from "@oslojs/crypto/random";
import { verifyAdminEmail } from "./emailTemplate";


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
        paperTrack: v.optional(v.union(
            v.literal("Cybersecurity, Privacy & Digital Trust"),
            v.literal("Artificial Intelligence and Machine Learning"),
            v.literal("Smart Systems, Internet of Things and Embedded Computing"),
            v.literal("Computing, Cloud, Edge and Distributed Systems"),
            v.literal("Data Science, Analytics and Big Data"),
            v.literal("Software Development"),
            v.literal("Health Informatics, Digital Health and Medical Laboratory Technology"),
            v.literal("Emerging Technologies and Digital Transformation"),
            v.literal("Computing for Sustainable Development"),
            v.literal("Information Systems, Governance and Society"),
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
            registrationNumber: existing.registrationNumber
        });

        await resend.sendEmail(ctx, {
            from: "icetia <conference@icetiaconference.org>",
            to: registration.email,
            subject: subject,
            text: body,
        });

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

        const subject = "ICETIA 2027 Conference Ticket";

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
            registrationNumber: registration.registrationNumber,
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
        paperTrack: v.optional(v.string()),
    },

    handler: async (ctx, args) => {
        let participants = await ctx.db
            .query("registrations")
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

        if (args.paperTrack) {
            participants = participants.filter(
                p => p.paperTrack === args.paperTrack
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
            participants.slice(0, 5).map(async (participant) => {

                // Get papers belonging to this participant
                const papers = await ctx.db
                    .query("submittedPapers")
                    .withIndex("by_registration_Id", q =>
                        q.eq("registrationId", participant._id)
                    )
                    .collect();

                return {
                    ...participant,

                    registrationPaper: {
                        paperTrack: participant.paperTrack ?? null,
                        paperTitle: participant.paperTitle ?? null,
                        paperFileId: participant.paperFileId ?? null,
                        paperUrl: participant.paperFileId
                            ? await ctx.storage.getUrl(participant.paperFileId)
                            : null,
                    },

                    submittedPapers: await Promise.all(
                        papers.map(async (paper) => ({
                            ...paper,
                            paperUrl: paper.paperFileId
                                ? await ctx.storage.getUrl(paper.paperFileId)
                                : null,
                        }))
                    ),
                };
            })
        );
    },
});

export const sendReminder = mutation({
    args: {
        registrationId: v.id("registrations"),
    },

    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("Unauthorized access.");
        }

        const user = await ctx.db.get(identity.subject as any);

        if (!user) {
            throw new ConvexError("Admin account not found or inactive.");
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
            registrationNumber: existing.registrationNumber,
            paymentStatus: existing.paymentStatus === "paid" ? "Paid" : "Pending"
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
            category: registration.category,
            paymentStatus: registration.paymentStatus,
        };
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

export const getCurrentAdmin = query({
    args: {},

    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return null;

        const userId = identity.subject.split("|")[0] as Id<"users">;

        const user = await ctx.db.get(userId);

        if (!user) return null;

        return {
            id: user._id,
            name: user.name,
            email: user.email,
        };
    },
});

export const getCurrentEditor = query({
    args: {},

    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return null;

        const userId = identity.subject.split("|")[0] as Id<"users">;

        const user = await ctx.db.get(userId);

        if (!user) return null;

        if (user.role !== "editor") {
            throw new ConvexError(
                "You are not authorized to access the editor dashboard."
            );
        }

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    },
});

export const getCurrentReviewer = query({
    args: {},

    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) return null;

        const userId = identity.subject.split("|")[0] as Id<"users">;

        const user = await ctx.db.get(userId);

        if (!user) return null;

        if (user.role !== "reviewer") {
            throw new ConvexError(
                "You are not authorized to access the reviewer dashboard."
            );
        }

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    },
});

export const handleSaveMember = mutation({
    args: {
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        role: v.union(
            v.literal("editor"),
            v.literal("reviewer")
        )
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("You must be logged in.");
        }

        const userId = identity.subject.split("|")[0] as Id<"users">;

        const currentUser = await ctx.db.get(userId);


        if (!currentUser || currentUser.role !== "super-admin") {
            throw new ConvexError(
                "Only super-admins can create team members."
            );
        }

        // Normalize email
        const email = args.email

        if (!email) {
            throw new ConvexError("Email address is required.");
        }

        const existingUser = await ctx.db
            .query("users")
            .withIndex("email", (q) => q.eq("email", email))
            .first();

        if (existingUser) {
            throw new ConvexError(
                "A user with this email address already exists."
            );
        }
        const memberId = await ctx.db.insert("users", {
            name: args.name,
            email,
            role: args.role,
            status: "inactive"
        });

        return {
            success: true,
            memberId,
            message: `${args.role === "editor" ? "Editor" : "Reviewer"} created successfully.`,
        };
    },
});

export const updateTeamMember = mutation({
    args: {
        memberId: v.id("users"),
        name: v.string(),
        email: v.string(),
        role: v.union(
            v.literal("editor"),
            v.literal("reviewer")
        ),
    },

    handler: async (ctx, args) => {
        // Authenticate current user
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("You must be logged in.");
        }

        const userId = identity.subject.split("|")[0] as Id<"users">;

        const currentUser = await ctx.db.get(userId);

        if (!currentUser || currentUser.role !== "super-admin") {
            throw new ConvexError(
                "Only super-admins can update team members."
            );
        }

        // Find member
        const member = await ctx.db.get(args.memberId);

        if (!member) {
            throw new ConvexError("Team member not found.");
        }

        if (
            member.role !== "editor" &&
            member.role !== "reviewer"
        ) {
            throw new ConvexError(
                "This user is not an editor or reviewer."
            );
        }

        const email = args.email;

        if (!email) {
            throw new ConvexError("Email address is required.");
        }

        // Prevent duplicate email addresses
        const existingUser = await ctx.db
            .query("users")
            .withIndex("email", (q) => q.eq("email", email))
            .first();

        if (existingUser && existingUser._id !== args.memberId) {
            throw new ConvexError(
                "Another user already uses this email address."
            );
        }

        // Update member
        await ctx.db.patch(args.memberId, {
            name: args.name.trim(),
            email,
            role: args.role,
        });

        return {
            success: true,
            message: "Team member updated successfully.",
        };
    },
});

export const toggleTeamMemberStatus = mutation({
    args: {
        memberId: v.id("users"),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("You must be logged in.");
        }

        const userId = identity.subject.split("|")[0] as Id<"users">;
        const currentUser = await ctx.db.get(userId);

        if (currentUser?.role !== "super-admin") {
            throw new ConvexError("You don't have permission to perform this action.");
        }

        const member = await ctx.db.get(args.memberId);

        if (!member || !["editor", "reviewer"].includes(member.role ?? "")) {
            throw new ConvexError("Team member not found.");
        }

        const newStatus = member.status === "inactive" ? "active" : "inactive";

        await ctx.db.patch(args.memberId, {
            status: newStatus,
        });

        return { success: true, status: newStatus };
    },
});

export const viewTeamMembers = query({
    args: {
        search: v.optional(v.string()),
        role: v.optional(v.union(
            v.literal("editor"),
            v.literal("reviewer")
        ))
    },
    handler: async (ctx, args) => {
        const team = await ctx.db.query("users").collect();

        const filteredTeam = team.filter(
            (member): member is typeof member & {
                role: "editor" | "reviewer";
            } => member.role === "editor" || member.role === "reviewer"
        );

        let result = filteredTeam;

        if (args.role) {
            result = result.filter(member => member.role === args.role);
        }

        if (args.search?.trim()) {
            const search = args.search.trim().toLowerCase();

            result = result.filter(
                member =>
                    member.name?.toLowerCase().includes(search) ||
                    member.email?.toLowerCase().includes(search)
            );
        }

        return result.map(member => ({
            id: member._id,
            name: member.name ?? "Unnamed Member",
            email: member.email ?? "No email address",
            role: member.role,
            status: member.status ?? "active",
            createdAt: member._creationTime,
        }));
    },
});

export const deleteTeamMember = mutation({
    args: {
        memberId: v.id("users"),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("You must be logged in.");
        }

        const userId = identity.subject.split("|")[0] as Id<"users">;
        const currentUser = await ctx.db.get(userId);

        if (currentUser?.role !== "super-admin") {
            throw new ConvexError("You don't have permission to perform this action.");
        }

        const member = await ctx.db.get(args.memberId);

        if (!member || !["editor", "reviewer"].includes(member.role ?? "")) {
            throw new ConvexError("Team member not found.");
        }

        await ctx.db.delete(args.memberId);

        return { success: true };
    },
});

export const handleSaveAssignment = mutation({
    args: {
        paperId: v.id("submittedPapers"),
        editorId: v.id("users"),
        reviewerIds: v.optional(v.array(v.id("users"))),
        status: v.union(
            v.literal("assigned"),
            v.literal("editor_assigned"),
            v.literal("under_review"),
            v.literal("reviews_completed"),
            v.literal("completed")
        ),
        reviewDeadline: v.optional(v.number()),
        editorDeadline: v.optional(v.number()),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("You must be logged in.");
        }

        const userId = identity.subject.split("|")[0] as Id<"users">;
        const currentUser = await ctx.db.get(userId);

        if (!currentUser || currentUser.role !== "super-admin") {
            throw new ConvexError(
                "Only super-admins can create assignments."
            );
        }

        // Validate paper
        const paper = await ctx.db.get(args.paperId);

        if (!paper) {
            throw new ConvexError("The selected paper could not be found.");
        }

        // Validate editor
        const editor = await ctx.db.get(args.editorId);

        if (!editor || editor.role !== "editor") {
            throw new ConvexError("Please select a valid editor.");
        }

        // Validate reviewers
        const reviewerIds = args.reviewerIds ?? [];

        if (new Set(reviewerIds).size !== reviewerIds.length) {
            throw new ConvexError("Duplicate reviewers are not allowed.");
        }

        if (reviewerIds.includes(args.editorId)) {
            throw new ConvexError(
                "An editor cannot also review the same paper."
            );
        }

        for (const reviewerId of reviewerIds) {
            const reviewer = await ctx.db.get(reviewerId);

            if (!reviewer || reviewer.role !== "reviewer") {
                throw new ConvexError(
                    "One or more selected reviewers are invalid."
                );
            }
        }

        // Prevent duplicate assignment for the same paper
        const existingAssignment = await ctx.db
            .query("paperAssignments")
            .collect();

        if (existingAssignment.some(
            (assignment) => assignment.paperId === args.paperId
        )) {
            throw new ConvexError(
                "This paper already has an assignment. Update the existing assignment instead."
            );
        }

        // Validate deadlines
        if (
            args.reviewDeadline !== undefined &&
            args.reviewDeadline <= Date.now()
        ) {
            throw new ConvexError(
                "The review deadline must be in the future."
            );
        }

        if (
            args.editorDeadline !== undefined &&
            args.editorDeadline <= Date.now()
        ) {
            throw new ConvexError(
                "The editor deadline must be in the future."
            );
        }

        const assignmentId = await ctx.db.insert("paperAssignments", {
            paperId: args.paperId,
            editorId: args.editorId,
            reviewerIds,
            assignedBy: userId,
            status: args.status,
            reviewDeadline: args.reviewDeadline,
            editorDeadline: args.editorDeadline,
        });

        return {
            success: true,
            assignmentId,
            message: "Paper assignment created successfully.",
        };
    },
});

export const updateAssignment = mutation({
    args: {
        assignmentId: v.id("paperAssignments"),
        paperId: v.id("submittedPapers"),
        editorId: v.id("users"),
        reviewerIds: v.optional(v.array(v.id("users"))),
        status: v.union(
            v.literal("assigned"),
            v.literal("editor_assigned"),
            v.literal("under_review"),
            v.literal("reviews_completed"),
            v.literal("completed")
        ),
        reviewDeadline: v.optional(v.number()),
        editorDeadline: v.optional(v.number()),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("You must be logged in.");
        }

        const userId = identity.subject.split("|")[0] as Id<"users">;
        const currentUser = await ctx.db.get(userId);

        if (!currentUser || currentUser.role !== "super-admin") {
            throw new ConvexError(
                "Only super-admins can update assignments."
            );
        }

        // Find existing assignment
        const assignment = await ctx.db.get(args.assignmentId);

        if (!assignment) {
            throw new ConvexError("Assignment not found.");
        }

        // Validate paper
        const paper = await ctx.db.get(args.paperId);

        if (!paper) {
            throw new ConvexError("The selected paper could not be found.");
        }

        // Validate editor
        const editor = await ctx.db.get(args.editorId);

        if (!editor || editor.role !== "editor") {
            throw new ConvexError("Please select a valid editor.");
        }

        // Validate reviewers
        const reviewerIds = args.reviewerIds ?? [];

        if (new Set(reviewerIds).size !== reviewerIds.length) {
            throw new ConvexError("Duplicate reviewers are not allowed.");
        }

        if (reviewerIds.includes(args.editorId)) {
            throw new ConvexError(
                "An editor cannot also review the same paper."
            );
        }

        for (const reviewerId of reviewerIds) {
            const reviewer = await ctx.db.get(reviewerId);

            if (!reviewer || reviewer.role !== "reviewer") {
                throw new ConvexError(
                    "One or more selected reviewers are invalid."
                );
            }
        }

        // Prevent another assignment for the same paper
        const existingAssignments = await ctx.db
            .query("paperAssignments")
            .collect();

        const duplicateAssignment = existingAssignments.find(
            (item) =>
                item.paperId === args.paperId &&
                item._id !== args.assignmentId
        );

        if (duplicateAssignment) {
            throw new ConvexError(
                "Another assignment already exists for this paper."
            );
        }

        // Validate deadlines
        if (
            args.reviewDeadline !== undefined &&
            args.reviewDeadline <= Date.now()
        ) {
            throw new ConvexError(
                "The review deadline must be in the future."
            );
        }

        if (
            args.editorDeadline !== undefined &&
            args.editorDeadline <= Date.now()
        ) {
            throw new ConvexError(
                "The editor deadline must be in the future."
            );
        }

        await ctx.db.patch(args.assignmentId, {
            paperId: args.paperId,
            editorId: args.editorId,
            reviewerIds,
            status: args.status,
            reviewDeadline: args.reviewDeadline,
            editorDeadline: args.editorDeadline,
        });

        return {
            success: true,
            message: "Assignment updated successfully.",
        };
    },
});

export const viewAssignments = query({
    args: {},

    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("You must be logged in.");
        }

        const userId = identity.subject.split("|")[0] as Id<"users">;
        const currentUser = await ctx.db.get(userId);

        if (!currentUser || currentUser.role !== "super-admin") {
            throw new ConvexError(
                "Only super-admins can view paper assignments."
            );
        }

        const assignments = await ctx.db
            .query("paperAssignments")
            .collect();

        const results = await Promise.all(
            assignments.map(async (assignment) => {
                const paper = await ctx.db.get(assignment.paperId);

                const editor = await ctx.db.get(assignment.editorId);

                const assignedBy = await ctx.db.get(
                    assignment.assignedBy
                );

                const reviewers = await Promise.all(
                    (assignment.reviewerIds ?? []).map(
                        async (reviewerId) => {
                            const reviewer = await ctx.db.get(reviewerId);

                            return reviewer
                                ? {
                                    id: reviewer._id,
                                    name: reviewer.name ?? "Unnamed Reviewer",
                                    email: reviewer.email ?? "",
                                    role: reviewer.role,
                                }
                                : null;
                        }
                    )
                );

                const registration = paper
                    ? await ctx.db.get(paper.registrationId)
                    : null;

                const paperUrl =
                    paper?.paperFileId
                        ? await ctx.storage.getUrl(paper.paperFileId)
                        : null;

                return {
                    ...assignment,

                    paper: paper
                        ? {
                            ...paper,
                            paperUrl,
                        }
                        : null,

                    editor: editor
                        ? {
                            id: editor._id,
                            name: editor.name ?? "Unnamed Editor",
                            email: editor.email ?? "",
                            role: editor.role,
                        }
                        : null,

                    reviewers: reviewers.filter(
                        (reviewer) => reviewer !== null
                    ),

                    assignedByUser: assignedBy
                        ? {
                            id: assignedBy._id,
                            name: assignedBy.name ?? "Unknown Admin",
                            email: assignedBy.email ?? "",
                        }
                        : null,

                    registration,
                };
            })
        );

        return results;
    },
});

export const deleteAssignments = mutation({
    args: {
        assignmentId: v.id("paperAssignments"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("You must be logged in.");
        }

        const userId = identity.subject.split("|")[0] as Id<"users">;
        const currentUser = await ctx.db.get(userId);

        if (currentUser?.role !== "super-admin") {
            throw new ConvexError("You don't have permission to perform this action.");
        }

        const assignment = await ctx.db.get(args.assignmentId);

        if (currentUser?.role !== "super-admin") {
            throw new ConvexError("You don't have permission to perform this action.");
        }

        if (!assignment) {
            throw new ConvexError("Assignment not found.");
        }

        await ctx.db.delete(args.assignmentId);

        return {
            success: true
        }
    }
})

export const ResendOTP = Email({
    id: "resend-otp",

    apiKey: process.env.RESEND_API_KEY,

    // OTP expires after 10 minutes
    maxAge: 60 * 10,

    async generateVerificationToken() {
        const random: RandomReader = {
            read(bytes) {
                crypto.getRandomValues(
                    new Uint8Array(bytes.buffer as ArrayBuffer, bytes.byteOffset, bytes.byteLength)
                );
            },
        };

        return generateRandomString(random, "0123456789", 6);
    },

    async sendVerificationRequest({
        identifier: email,
        provider,
        token,
    }) {
        const resend = new ResendAPI(provider.apiKey);

        const { error } = await resend.emails.send({
            from:
                "ICETIA <conference@icetiaconference.org>",
            to: [email],
            subject: "ICETIA 2027 Admin Email Verification",
            text: verifyAdminEmail({
                email,
                otp_code: token,
            }),
        });

        if (error) {
            throw new Error(JSON.stringify(error));
        }
    },
});

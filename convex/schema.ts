import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    registrations: defineTable({
        registrationNumber: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
        category: v.union(
            v.literal("author"),
            v.literal("participant"),
            v.literal("student")
        ),
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
        paperFileId: v.optional(v.id("_storage")),

        coAuthors: v.optional(v.array(v.object({
            firstName: v.string(),
            lastName: v.string(),
            email: v.optional(v.string()),
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
        }))),
        amount: v.number(),
        paymentStatus: v.union(
            v.literal("pending"),
            v.literal("paid"),
            v.literal("failed"),
            v.literal("cancelled")
        ),
        paymentReference: v.optional(v.string()),
        paidAt: v.optional(v.number()),
        ticketSent: v.boolean(),
        confirmationEmailSent: v.boolean(),
    }).index("by_email", ["email"])
        .index("by_registration_number", ["registrationNumber"])
        .index("by_paper_track", ["paperTrack"])
        .index("by_payment_reference", ["paymentReference"])
        .index("by_payment_status", ["paymentStatus"]),

    payments: defineTable({
        registrationId: v.id("registrations"),
        reference: v.string(),
        gateway: v.union(
            v.literal("paystack"),
        ),
        amount: v.number(),
        status: v.union(
            v.literal("pending"),
            v.literal("success"),
            v.literal("failed"),
            v.literal("cancelled")
        ),
        gatewayResponse: v.optional(v.string())
    }).index("by_registration", ["registrationId"])
        .index("by_reference", ["reference"]),

    emails: defineTable({
        to: v.string(),
        subject: v.string(),
        body: v.string(),
    }),

    admins: defineTable({
        email: v.string(),
        passwordHash: v.string(),
    })
        .index("by_email", ["email"]),

    adminSessions: defineTable({
        adminId: v.id("admins"),
        tokenHash: v.string(),
        expiresAt: v.number(),
    })
        .index("by_tokenHash", ["tokenHash"]),

    submittedPapers: defineTable({
        registrationId: v.id("registrations"),

        paperTrack: v.string(),

        paperTitle: v.string(),

        abstract: v.optional(v.string()),

        paperFileId: v.optional(v.id("_storage")),

        status: v.union(
            v.literal("submitted"),
            v.literal("under_review"),
            v.literal("accepted"),
            v.literal("rejected"),
            v.literal("revision_required")
        ),

    })
        .index("by_registration_Id", ["registrationId"])
        .index("by_paper_track", ["paperTrack"])
        .index("by_status", ["status"])
        .index("by_registration_and_track", [
            "registrationId",
            "paperTrack",
        ]),

    submittedWorkShopPapers: defineTable({
        registrationId: v.id("registrations"),

        paperTrack: v.string(),

        paperTitle: v.string(),

        abstract: v.optional(v.string()),

        paperFileId: v.optional(v.id("_storage")),

        status: v.union(
            v.literal("submitted"),
            v.literal("under_review"),
            v.literal("accepted"),
            v.literal("rejected"),
            v.literal("revision_required")
        ),

    })
        .index("by_registration_Id", ["registrationId"])
        .index("by_paper_track", ["paperTrack"])
        .index("by_status", ["status"])
        .index("by_registration_and_track", [
            "registrationId",
            "paperTrack",
        ]),


    paperSubmissionOtps: defineTable({
        registrationId: v.id("registrations"),
        registrationNumber: v.string(),
        email: v.string(),
        otpHash: v.string(),
        expiresAt: v.number(),
        verified: v.boolean(),
        attempts: v.number(),
        createdAt: v.number(),
    }).index("by_registration", ["registrationId"]),

    
paperSubmissionSessions: defineTable({
  registrationId: v.id("registrations"),
  sessionTokenHash: v.string(),
  expiresAt: v.number(),
  createdAt: v.number(),
}).index("by_registration", ["registrationId"])
.index("by_session_token_hash", ["sessionTokenHash"]),


})
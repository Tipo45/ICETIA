import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    ...authTables,
    users: defineTable({
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        emailVerificationTime: v.optional(v.number()),
        phone: v.optional(v.string()),
        phoneVerificationTime: v.optional(v.number()),
        role: v.optional(v.union(
            v.literal("super-admin"),
            v.literal("editor"),
            v.literal("reviewer")
        )),
    }).index("email", ["email"])
        .index("name", ["name"])
        .index("role", ["role"]),
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
        used: v.boolean(),
    }).index("by_registration", ["registrationId"])
        .index("by_session_token_hash", ["sessionTokenHash"]),

    paperAssignments: defineTable({
        paperId: v.id("submittedPapers"),
        editorId: v.id("users"),
        reviewerIds: v.array(v.id("users")),
        assignedBy: v.id("users"),
        status: v.union(
            v.literal("assigned"),
            v.literal("editor_assigned"),
            v.literal("under_review"),
            v.literal("reviews_completed"),
            v.literal("completed")
        ),
        reviewDeadline: v.optional(v.number()),
        editorDeadline: v.optional(v.number()),
        assignedAt: v.number(),
    })
        .index("by_paper", ["paperId"])
        .index("by_editor", ["editorId"])
        .index("by_status", ["status"]),

    paperReviews: defineTable({
        paperId: v.id("submittedPapers"),
        assignmentId: v.id("paperAssignments"),
        reviewerId: v.id("users"),
        status: v.union(
            v.literal("pending"),
            v.literal("accepted"),
            v.literal("declined"),
            v.literal("in_progress"),
            v.literal("submitted")
        ),
        recommendation: v.optional(v.union(
            v.literal("accept"),
            v.literal("minor_revision"),
            v.literal("major_revision"),
            v.literal("reject")
        )),
        comments: v.optional(v.string()),
        confidentialComments: v.optional(v.string()),
        submittedAt: v.optional(v.number()),
        createdAt: v.number(),
    })
        .index("by_paper", ["paperId"])
        .index("by_reviewer", ["reviewerId"])
        .index("by_assignment", ["assignmentId"]),

    editorialDecisions: defineTable({
        paperId: v.id("submittedPapers"),
        editorId: v.id("users"),
        decision: v.union(
            v.literal("accepted"),
            v.literal("rejected"),
            v.literal("revision_required")
        ),
        comments: v.optional(v.string()),
        decidedAt: v.number(),
    })
        .index("by_paper", ["paperId"])
        .index("by_editor", ["editorId"]),

    adminActivityLogs: defineTable({
        adminId: v.id("users"),
        action: v.string(),
        description: v.string(),
        relatedPaperId: v.optional(v.id("submittedPapers")),
        relatedUserId: v.optional(v.id("users")),
        createdAt: v.number(),
    })
        .index("by_admin", ["adminId"])
        .index("by_created_at", ["createdAt"]),

})
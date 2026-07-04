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
        paperTitle: v.optional(v.string()),
        // paperId: v.optional(v.string()),

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
        .index("by_payment_reference", ["paymentReference"]),

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
    })
})
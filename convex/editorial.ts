import {
    mutation,
    query,
} from "./_generated/server";

import {
    v,
    ConvexError,
} from "convex/values";
import { Id } from "./_generated/dataModel";

async function logActivity(
    ctx: any,
    adminId: Id<"users">,
    action: string,
    description: string,
    relatedPaperId?: Id<"submittedPapers">,
    relatedUserId?: Id<"users">
) {
    await ctx.db.insert("adminActivityLogs", {
        adminId,
        action,
        description,
        relatedPaperId,
        relatedUserId,
        createdAt: Date.now(),
    });
}

export const getEditorialDashboard = query({
    args: {},

    handler: async (ctx, args) => {
        

        const [papers, users, assignments] = await Promise.all([
            ctx.db.query("submittedPapers").collect(),
            ctx.db.query("users").collect(),
            ctx.db.query("paperAssignments").collect(),
        ]);

        const editors = users.filter(
            (user) => user.role === "editor"
        );

        const reviewers = users.filter(
            (user) => user.role === "reviewer"
        );

        const reviews = await ctx.db.query("paperReviews").collect();

        return {
            totalPapers: papers.length,

            submitted: papers.filter(
                (paper) => paper.status === "submitted"
            ).length,

            underReview: papers.filter(
                (paper) => paper.status === "under_review"
            ).length,

            accepted: papers.filter(
                (paper) => paper.status === "accepted"
            ).length,

            rejected: papers.filter(
                (paper) => paper.status === "rejected"
            ).length,

            revisionRequired: papers.filter(
                (paper) => paper.status === "revision_required"
            ).length,

            totalEditors: editors.length,
            totalReviewers: reviewers.length,

            pendingAssignments: assignments.filter(
                (assignment) => assignment.status === "assigned"
            ).length,

            pendingReviews: reviews.filter(
                (review) =>
                    review.status === "pending" ||
                    review.status === "in_progress"
            ).length,
        };
    },
});

export const getEditorialPapers = query({
    args: {},

    handler: async (ctx, args) => {
    
        const papers = await ctx.db
            .query("submittedPapers")
            .collect();

        return await Promise.all(
            papers.map(async (paper) => {
                const registration = await ctx.db.get(
                    paper.registrationId
                );

                const assignment = await ctx.db
                    .query("paperAssignments")
                    .withIndex("by_paper", (q) =>
                        q.eq("paperId", paper._id)
                    )
                    .unique();

                const reviews = await ctx.db
                    .query("paperReviews")
                    .withIndex("by_paper", (q) =>
                        q.eq("paperId", paper._id)
                    )
                    .collect();

                const editor = assignment
                    ? await ctx.db.get(assignment.editorId)
                    : null;

                const reviewers = assignment
                    ? await Promise.all(
                        assignment.reviewerIds.map((id) =>
                            ctx.db.get(id)
                        )
                    )
                    : [];

                return {
                    ...paper,

                    paperUrl: paper.paperFileId
                        ? await ctx.storage.getUrl(paper.paperFileId)
                        : null,

                    authorName: registration
                        ? `${registration.firstName} ${registration.lastName}`
                        : "Unknown author",

                    authorEmail: registration?.email ?? "",

                    assignment,

                    editorName: editor?.name ?? null,

                    reviewers: reviewers.filter(Boolean),

                    reviews,
                };
            })
        );
    },
});

export const updateReviewStatus = mutation({
    args: {
        reviewId: v.id("paperReviews"),
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
    },

    handler: async (ctx, args) => {

        const review = await ctx.db.get(args.reviewId);

        if (!review) {
            throw new ConvexError("Review not found.");
        }

        await ctx.db.patch(args.reviewId, {
            status: args.status,
            recommendation: args.recommendation,
            comments: args.comments,
            confidentialComments: args.confidentialComments,
            submittedAt:
                args.status === "submitted"
                    ? Date.now()
                    : review.submittedAt,
        });

        // await logActivity(
        //     ctx,
        //     // // admin._id,
        //     // "REVIEW_UPDATED",
        //     `Updated review status to ${args.status}.`,
        //     review.paperId,
        //     review.reviewerId
        // );

        return { success: true };
    },
});

// --------------------------------------------------
// EDITORIAL DECISIONS
// --------------------------------------------------

export const makeEditorialDecision = mutation({
    args: {
        paperId: v.id("submittedPapers"),
        editorId: v.id("users"),
        decision: v.union(
            v.literal("accepted"),
            v.literal("rejected"),
            v.literal("revision_required")
        ),
        comments: v.optional(v.string()),
    },

    handler: async (ctx, args) => {

        const paper = await ctx.db.get(args.paperId);

        if (!paper) {
            throw new ConvexError("Paper not found.");
        }

        const editor = await ctx.db.get(args.editorId);

        if (!editor || editor.role !== "editor") {
            throw new ConvexError("Invalid editor.");
        }

        const assignment = await ctx.db
            .query("paperAssignments")
            .withIndex("by_paper", (q) =>
                q.eq("paperId", args.paperId)
            )
            .unique();

        if (!assignment || assignment.editorId !== args.editorId) {
            throw new ConvexError(
                "This editor is not assigned to the paper."
            );
        }

        const reviews = await ctx.db
            .query("paperReviews")
            .withIndex("by_paper", (q) =>
                q.eq("paperId", args.paperId)
            )
            .collect();

        if (
            reviews.length > 0 &&
            reviews.some((review) => review.status !== "submitted")
        ) {
            throw new ConvexError(
                "All assigned reviewers must submit their reviews before a final decision."
            );
        }

        await ctx.db.insert("editorialDecisions", {
            paperId: args.paperId,
            editorId: args.editorId,
            decision: args.decision,
            comments: args.comments,
            decidedAt: Date.now(),
        });

        await ctx.db.patch(args.paperId, {
            status: args.decision,
        });

        await ctx.db.patch(assignment._id, {
            status: "completed",
        });

        // await logActivity(
        //     ctx,
        //     admin._id,
        //     "EDITORIAL_DECISION",
        //     `Paper "${paper.paperTitle}" decision: ${args.decision}.`,
        //     args.paperId,
        //     args.editorId
        // );

        return { success: true };
    },
});

// --------------------------------------------------
// ACTIVITY LOG
// --------------------------------------------------

export const getActivityLogs = query({
    args: {},

    handler: async (ctx, args) => {

        return await ctx.db
            .query("adminActivityLogs")
            .withIndex("by_created_at")
            .order("desc")
            .take(50);
    },
});

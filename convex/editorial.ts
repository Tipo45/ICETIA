import {
    mutation,
    query,
} from "./_generated/server";

import {
    v,
    ConvexError,
} from "convex/values";
import { Id } from "./_generated/dataModel";

async function hashToken(token: string) {
    const encoded = new TextEncoder().encode(token);

    const digest = await crypto.subtle.digest(
        "SHA-256",
        encoded
    );

    return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

async function verifyAdmin(ctx: any, token: string) {
    if (!token) {
        throw new ConvexError("Admin authentication required.");
    }

    const tokenHash = await hashToken(token);

    const session = await ctx.db
        .query("adminSessions")
        .withIndex("by_session_token_hash", (q: any) =>
            q.eq("sessionTokenHash", tokenHash)
        )
        .unique();

    if (
        !session ||
        session.used ||
        session.expiresAt <= Date.now()
    ) {
        throw new ConvexError(
            "Your admin session has expired. Please log in again."
        );
    }
    
    const admin = await ctx.db.get(session.adminId);

    if (!admin) {
        throw new ConvexError("Administrator account not found.");
    }

    return admin;
}

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
    args: {
        token: v.string(),
    },

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

export const getEditorialTeam = query({
    args: {
        token: v.string(),
    },

    handler: async (ctx, args) => {

        const users = await ctx.db.query("users").collect();

        return users.filter(
            (user) =>
                user.role === "editor" ||
                user.role === "reviewer"
        );
    },
});

export const addEditorialMember = mutation({
    args: {
        token: v.string(),
        name: v.string(),
        email: v.string(),
        role: v.union(
            v.literal("editor"),
            v.literal("reviewer")
        ),
    },

    handler: async (ctx, args) => {
        const admin = await verifyAdmin(ctx, args.token);

        const email = args.email.trim().toLowerCase();

        if (!email || !args.name.trim()) {
            throw new ConvexError(
                "Name and email are required."
            );
        }

        const existing = await ctx.db
            .query("users")
            .withIndex("email", (q) =>
                q.eq("email", email)
            )
            .unique();

        if (existing) {
            if (existing.role) {
                throw new ConvexError(
                    "This user already has an editorial role."
                );
            }

            await ctx.db.patch(existing._id, {
                name: args.name.trim(),
                role: args.role,
            });

            await logActivity(
                ctx,
                admin._id,
                "EDITORIAL_MEMBER_ADDED",
                `${args.name} was added as a ${args.role}.`,
                undefined,
                existing._id
            );

            return existing._id;
        }

        const userId = await ctx.db.insert("users", {
            name: args.name.trim(),
            email,
            role: args.role,
        });

        await logActivity(
            ctx,
            admin._id,
            "EDITORIAL_MEMBER_ADDED",
            `${args.name} was added as a ${args.role}.`,
            undefined,
            userId
        );

        return userId;
    },
});

export const updateEditorialMember = mutation({
    args: {
        token: v.string(),
        userId: v.id("users"),
        name: v.string(),
        institution: v.optional(v.string()),
        expertise: v.array(v.string()),
        bio: v.optional(v.string()),
    },

    handler: async (ctx, args) => {
        const admin = await verifyAdmin(ctx, args.token);

        const user = await ctx.db.get(args.userId);

        if (
            !user ||
            (user.role !== "editor" && user.role !== "reviewer")
        ) {
            throw new ConvexError(
                "Editorial team member not found."
            );
        }

        await ctx.db.patch(args.userId, {
            name: args.name.trim(),
        });

        await logActivity(
            ctx,
            admin._id,
            "EDITORIAL_MEMBER_UPDATED",
            `Updated ${user.name ?? user.email}.`,
            undefined,
            args.userId
        );

        return { success: true };
    },
});

export const toggleEditorialMember = mutation({
    args: {
        token: v.string(),
        userId: v.id("users"),
        isActive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const admin = await verifyAdmin(ctx, args.token);

        const user = await ctx.db.get(args.userId);

        if (
            !user ||
            (user.role !== "editor" && user.role !== "reviewer")
        ) {
            throw new ConvexError(
                "Editorial team member not found."
            );
        }

        // await ctx.db.patch(args.userId, {
        //     isActive: args.isActive,
        // });

        await logActivity(
            ctx,
            admin._id,
            args.isActive ? "MEMBER_ACTIVATED" : "MEMBER_DEACTIVATED",
            `${user.name ?? user.email} was ${
                args.isActive ? "activated" : "deactivated"
            }.`,
            undefined,
            args.userId
        );

        return { success: true };
    },
});

export const getEditorialPapers = query({
    args: {
        token: v.string(),
    },

    handler: async (ctx, args) => {
        await verifyAdmin(ctx, args.token);

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

export const assignPaper = mutation({
    args: {
        token: v.string(),
        paperId: v.id("submittedPapers"),
        editorId: v.id("users"),
        reviewerIds: v.array(v.id("users")),
        reviewDeadline: v.optional(v.number()),
        editorDeadline: v.optional(v.number()),
    },

    handler: async (ctx, args) => {
        const admin = await verifyAdmin(ctx, args.token);

        const paper = await ctx.db.get(args.paperId);

        if (!paper) {
            throw new ConvexError("Paper not found.");
        }

        const editor = await ctx.db.get(args.editorId);

        if (
            !editor ||
            editor.role !== "editor"
        ) {
            throw new ConvexError(
                "Please select an active editor."
            );
        }

        if (new Set(args.reviewerIds).size !== args.reviewerIds.length) {
            throw new ConvexError("Duplicate reviewers are not allowed.");
        }

        if (args.reviewerIds.includes(args.editorId)) {
            throw new ConvexError(
                "The assigned editor cannot also review the same paper."
            );
        }

        for (const reviewerId of args.reviewerIds) {
            const reviewer = await ctx.db.get(reviewerId);

            if (
                !reviewer ||
                reviewer.role !== "reviewer"
            ) {
                throw new ConvexError(
                    "One or more selected reviewers are invalid."
                );
            }
        }

        const existing = await ctx.db
            .query("paperAssignments")
            .withIndex("by_paper", (q) =>
                q.eq("paperId", args.paperId)
            )
            .unique();

        let assignmentId: Id<"paperAssignments">;

        if (existing) {
            assignmentId = existing._id;

            await ctx.db.patch(existing._id, {
                editorId: args.editorId,
                reviewerIds: args.reviewerIds,
                reviewDeadline: args.reviewDeadline,
                editorDeadline: args.editorDeadline,
                status: args.reviewerIds.length
                    ? "under_review"
                    : "editor_assigned",
            });
        } else {
            assignmentId = await ctx.db.insert("paperAssignments", {
                paperId: args.paperId,
                editorId: args.editorId,
                reviewerIds: args.reviewerIds,
                assignedBy: admin._id,
                reviewDeadline: args.reviewDeadline,
                editorDeadline: args.editorDeadline,
                assignedAt: Date.now(),
                status: args.reviewerIds.length
                    ? "under_review"
                    : "editor_assigned",
            });
        }

        // Synchronise reviewer records with the assignment.
        const oldReviews = await ctx.db
            .query("paperReviews")
            .withIndex("by_assignment", (q) =>
                q.eq("assignmentId", assignmentId)
            )
            .collect();

        for (const review of oldReviews) {
            if (!args.reviewerIds.includes(review.reviewerId)) {
                await ctx.db.delete(review._id);
            }
        }

        for (const reviewerId of args.reviewerIds) {
            const previous = oldReviews.find(
                (review) => review.reviewerId === reviewerId
            );

            if (!previous) {
                await ctx.db.insert("paperReviews", {
                    paperId: args.paperId,
                    assignmentId,
                    reviewerId,
                    status: "pending",
                    createdAt: Date.now(),
                });
            }
        }

        await ctx.db.patch(args.paperId, {
            status: args.reviewerIds.length
                ? "under_review"
                : "submitted",
        });

        await logActivity(
            ctx,
            admin._id,
            "PAPER_ASSIGNED",
            `Assigned paper "${paper.paperTitle}" to ${editor.name}.`,
            args.paperId,
            args.editorId
        );

        return {
            success: true,
            assignmentId,
        };
    },
});

export const updateReviewStatus = mutation({
    args: {
        token: v.string(),
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
        const admin = await verifyAdmin(ctx, args.token);

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

        await logActivity(
            ctx,
            admin._id,
            "REVIEW_UPDATED",
            `Updated review status to ${args.status}.`,
            review.paperId,
            review.reviewerId
        );

        return { success: true };
    },
});

// --------------------------------------------------
// EDITORIAL DECISIONS
// --------------------------------------------------

export const makeEditorialDecision = mutation({
    args: {
        token: v.string(),
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
        const admin = await verifyAdmin(ctx, args.token);

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

        await logActivity(
            ctx,
            admin._id,
            "EDITORIAL_DECISION",
            `Paper "${paper.paperTitle}" decision: ${args.decision}.`,
            args.paperId,
            args.editorId
        );

        return { success: true };
    },
});

// --------------------------------------------------
// ACTIVITY LOG
// --------------------------------------------------

export const getActivityLogs = query({
    args: {
        token: v.string(),
    },

    handler: async (ctx, args) => {
        await verifyAdmin(ctx, args.token);

        return await ctx.db
            .query("adminActivityLogs")
            .withIndex("by_created_at")
            .order("desc")
            .take(50);
    },
});

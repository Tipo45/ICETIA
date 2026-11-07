import { query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const getCurrentEditor = query({
    args: {},

    handler: async (ctx, args) => {
        // Get authenticated user
        const identity = await ctx.auth.getUserIdentity();

        if (!identity?.email) {
            throw new ConvexError("Unauthenticated.");
        }

        // Find admin by authenticated email
        const admin = await ctx.db
            .query("users")
            .withIndex("email", (q) =>
                q.eq("email", identity.email!.toLowerCase())
            )
            .unique();

        // Check admin authorization
        if (!admin) {
            throw new ConvexError(
                "Only authorized admins can access."
            );
        }

        // Check role authorization
        if (admin.role !== "editor") {
            throw new ConvexError(
                "You are not authorized to access this page."
            );
        }

        return {
            adminId: admin._id,
            email: admin.email,
            role: admin.role,
        };
    },
});

export const getCurrentReviewer = query({
    args: {},

    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity?.email) {
            throw new ConvexError("Unauthenticated.");
        }

        const admin = await ctx.db
            .query("users")
            .withIndex("email", (q) =>
                q.eq("email", identity.email!.toLowerCase())
            )
            .unique();

        if (!admin) {
            throw new ConvexError(
                "Only authorized admins can access."
            );
        }

        if (admin.role !== "reviewer") {
            throw new ConvexError(
                "You are not authorized to access the reviewer dashboard."
            );
        }

        return {
            adminId: admin._id,
            email: admin.email,
            role: admin.role,
        };
    },
});
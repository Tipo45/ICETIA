import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

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
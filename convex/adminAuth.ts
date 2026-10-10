"use node";

import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import bcrypt from "bcryptjs";
import type { Id } from "./_generated/dataModel";
import { createHash, randomBytes } from "node:crypto";

export const createInitialAdmin = internalAction({
    args: {
        email: v.string(),
        password: v.string(),
    },

    handler: async (
        ctx,
        args
    ): Promise<{
        success: boolean;
        adminId: Id<"admins">;
    }> => {
        const email = args.email.trim().toLowerCase();
        const passwordHash = await bcrypt.hash(args.password, 12);

        const adminId: Id<"admins"> = await ctx.runMutation(
            internal.registration.createAdmin,
            {
                email,
                passwordHash,
            }
        );

        return {
            success: true,
            adminId,
        };
    },
});

export const registerAdmin = action({
    args: {
        email: v.string(),
        password: v.string(),
    },

    handler: async (
        ctx,
        args
    ): Promise<{
        success: boolean;
        adminId: string;
        email: string;
    }> => {
        const email = args.email.trim().toLowerCase();

        const passwordHash = await bcrypt.hash(
            args.password,
            12
        );

        const adminId = await ctx.runMutation(
            internal.registration.createAdmin,
            {
                email,
                passwordHash,
            }
        );

        return {
            success: true,
            adminId,
            email,
        };
    },
});

export const loginAdmin = action({
    args: {
        email: v.string(),
        password: v.string(),
    },

    handler: async (
        ctx,
        args
    ): Promise<{
        success: boolean;
        adminId: string;
        email: string;
        token: string;
    }> => {
        const email = args.email.trim().toLowerCase();

        const admin = await ctx.runQuery(
            internal.registration.getAdminByEmail,
            {
                email,
            }
        );

        if (!admin) {
            throw new Error("Invalid email or password");
        }

        const passwordMatches = await bcrypt.compare(
            args.password,
            admin.passwordHash
        );

        if (!passwordMatches) {
            throw new Error("Invalid email or password");
        }

        const token = randomBytes(32).toString("hex");

        const tokenHash = createHash("sha256")
            .update(token)
            .digest("hex");

        const expiresAt = Date.now() + 60 * 60 * 1000;

        await ctx.runMutation(internal.registration.createAdminSession, {
            adminId: admin._id,
            tokenHash,
            expiresAt,
        });

        return {
            success: true,
            adminId: admin._id,
            email: admin.email,
            token,
        };
    },
});
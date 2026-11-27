
import {
  mutation,
  query,
  internalQuery,
} from "./_generated/server";

import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// Hash an invitation token before storing or looking it up.
async function hashToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(token)
  );

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Generate a cryptographically random invitation token.
function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Check that the caller is an active Super Admin.
async function requireSuperAdmin(ctx: any) {
  const userId = await getAuthUserId(ctx);

  if (!userId) {
    throw new ConvexError("You must be logged in.");
  }

  const user = await ctx.db.get(userId);

  if (
    !user ||
    user.role !== "super-admin"
  ) {
    throw new ConvexError(
      "Only active Super Admins can perform this action."
    );
  }

  return user;
}

/* -------------------------------------------
   1. CREATE ADMIN INVITATION
-------------------------------------------- */

export const createAdminInvitation = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.union(
      v.literal("editor"),
      v.literal("reviewer")
    ),
  },

  handler: async (ctx, args) => {
    const superAdmin = await requireSuperAdmin(ctx);

    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();

    if (!name || !email) {
      throw new ConvexError(
        "Name and email are required."
      );
    }

    // Prevent duplicate administrator accounts.
    const existingUser = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", email))
      .first();

    if (existingUser) {
      throw new ConvexError(
        "An account with this email already exists."
      );
    }

    // Invalidate previous unused invitations for this email.
    const previousInvitations = await ctx.db
      .query("adminInvitations")
      .withIndex("by_email", (q) => q.eq("email", email))
      .collect();

    for (const invitation of previousInvitations) {
      if (!invitation.used) {
        await ctx.db.patch(invitation._id, {
          used: true,
        });
      }
    }

    const token = generateToken();
    const tokenHash = await hashToken(token);

    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    const invitationId = await ctx.db.insert(
      "adminInvitations",
      {
        name,
        email,
        role: args.role,
        tokenHash,
        expiresAt,
        used: false,
        createdAt: Date.now(),
        createdBy: superAdmin._id,
      }
    );

    return {
      invitationId,
      token,
      email,
      name,
      role: args.role,
      expiresAt,
    };
  },
});


/* -------------------------------------------
   2. GET / VALIDATE INVITATION
-------------------------------------------- */

export const getInvitation = query({
  args: {
    token: v.string(),
  },

  handler: async (ctx, args) => {
    if (!args.token) {
      return { valid: false };
    }

    const tokenHash = await hashToken(args.token);

    const invitation = await ctx.db
      .query("adminInvitations")
      .withIndex("by_token_hash", (q) =>
        q.eq("tokenHash", tokenHash)
      )
      .unique();

    if (
      !invitation ||
      invitation.used ||
      invitation.expiresAt <= Date.now()
    ) {
      return { valid: false };
    }

    return {
      valid: true,
      name: invitation.name,
      email: invitation.email,
      role: invitation.role,
      expiresAt: invitation.expiresAt,
    };
  },
});


/* -------------------------------------------
   INTERNAL INVITATION VALIDATION
   Used by the Password provider.
-------------------------------------------- */

export const getInvitationForPasswordSignup = internalQuery({
  args: {
    token: v.string(),
    email: v.string(),
  },

  handler: async (ctx, args) => {
    const tokenHash = await hashToken(args.token);

    const invitation = await ctx.db
      .query("adminInvitations")
      .withIndex("by_token_hash", (q) =>
        q.eq("tokenHash", tokenHash)
      )
      .unique();

    if (
      !invitation ||
      invitation.used ||
      invitation.expiresAt <= Date.now() ||
      invitation.email !== args.email.trim().toLowerCase()
    ) {
      return null;
    }

    return {
      name: invitation.name,
      email: invitation.email,
      role: invitation.role,
    };
  },
});


/* -------------------------------------------
   3. ACCEPT INVITATION
-------------------------------------------- */

export const acceptInvitation = mutation({
  args: {
    token: v.string(),
  },

  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError(
        "You must be authenticated to accept this invitation."
      );
    }

    const user = await ctx.db.get(userId);

    if (!user || !user.email) {
      throw new ConvexError(
        "Authenticated user account not found."
      );
    }

    const tokenHash = await hashToken(args.token);

    const invitation = await ctx.db
      .query("adminInvitations")
      .withIndex("by_token_hash", (q) =>
        q.eq("tokenHash", tokenHash)
      )
      .unique();

    if (
      !invitation ||
      invitation.used ||
      invitation.expiresAt <= Date.now()
    ) {
      throw new ConvexError(
        "This invitation is invalid, expired, or already used."
      );
    }

    const email = user.email.trim().toLowerCase();

    if (email !== invitation.email) {
      throw new ConvexError(
        "This invitation belongs to a different email address."
      );
    }

    // Confirm the role was assigned during Password sign-up.
    if (
      user.role !== invitation.role ||
      user.status !== "active"
    ) {
      throw new ConvexError(
        "Your account does not match the invited role."
      );
    }

    await ctx.db.patch(invitation._id, {
      used: true,
    });

    // Ensure the profile has the invited details.
    await ctx.db.patch(userId, {
      name: invitation.name,
      email: invitation.email,
      role: invitation.role,
      status: "active",
    });

    return {
      success: true,
      userId,
      role: invitation.role,
    };
  },
});

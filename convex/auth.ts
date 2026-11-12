
import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP } from "./Resend";

export const {
    auth,
    signIn,
    signOut,
    store,
    isAuthenticated,
} = convexAuth({
    providers: [ResendOTP],

    callbacks: {
        async beforeSessionCreation(ctx, { userId }) {
            const user = await ctx.db.get(userId);

            if (!user) {
                throw new Error("Unauthorized access.");
            }

            const allowedRoles = [
                "super-admin",
                "editors",
                "reviewers"
            ];

            if (!allowedRoles.includes(user.role)) {
                throw new Error("You are not authorized to access the admin dashboard.");
            }

        },
    },
});

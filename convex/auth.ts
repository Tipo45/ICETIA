
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { ResendOTP } from "./registration";

export const {
    auth,
    signIn,
    signOut,
    store,
    isAuthenticated,
} = convexAuth({
    providers: [ResendOTP, Password],

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

            if (!user.role || !allowedRoles.includes(user.role)) {
                throw new Error("You are not authorized to access the admin dashboard.");
            }

        },
    },
});

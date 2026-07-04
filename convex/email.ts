import { components, internal } from "./_generated/api";
import { Resend, vEmailEvent, vEmailId } from "@convex-dev/resend";
import { internalMutation, mutation } from "./_generated/server";

export const resend: Resend = new Resend(components.resend, {
    testMode: false,
});
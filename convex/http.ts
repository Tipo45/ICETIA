import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { resend } from "./email";
import { auth } from "./auth";

const http = httpRouter();

http.route({
  path: "/resend-webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    return await resend.handleResendEventWebhook(ctx, req);
  }),
});

auth.addHttpRoutes(http);

export default http;

"use node";

import { randomInt, createHash, randomBytes } from "node:crypto";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v, ConvexError } from "convex/values";
import { resend } from "./registration";
import { verifyId } from "./emailTemplate";

export const requestPaperSubmissionOtp = action({
  args: {
    registrationNumber: v.string(),
  },

  handler: async (ctx, args) => {
    const registrationNumber = args.registrationNumber.trim();

    if (!registrationNumber) {
      throw new ConvexError("Please enter your registration number.");
    }

    // 1. Find the registration by its human-readable number.
    const registration = await ctx.runQuery(
      internal.registration.getRegistrationForOtp,
      { registrationNumber }
    );

    if (!registration) {
      throw new ConvexError("Registration not found.");
    }

    // 2. Check eligibility.
    if (registration.category !== "author") {
      throw new ConvexError(
        "Only registered authors can submit papers."
      );
    }

    if (registration.paymentStatus !== "paid") {
      throw new ConvexError(
        "Payment must be confirmed before paper submission."
      );
    }

    // 3. Generate the OTP and hash it for storage.
    const otp = randomInt(100000, 1000000).toString();

    const otpHash = createHash("sha256")
      .update(otp)
      .digest("hex");

    const expiresAt = Date.now() + 10 * 60 * 1000;

    // 4. Store the OTP against the actual Convex registration ID.
    await ctx.runMutation(
      internal.registration.storePaperSubmissionOtp,
      {
        registrationId: registration._id,
        registrationNumber: registration.registrationNumber,
        email: registration.email,
        otpHash,
        expiresAt,
      }
    );

    // 5. Send the plain OTP to the registered email address.
    try {
      const body = verifyId({
        registrationNumber: registration.registrationNumber,
        otp_code: otp,
      });

      await resend.sendEmail(ctx, {
        from: "ICETIA <conference@icetiaconference.org>",
        to: registration.email,
        subject: "Verify Your Registration ID - ICETIA 2027",
        text: body,
      });
    } catch {
      await ctx.runMutation(
        internal.registration.clearPaperSubmissionOtps,
        { registrationId: registration._id }
      );

      throw new ConvexError(
        "Unable to send the verification email. Please try again."
      );
    }

    return {
      success: true,
      message:
        "A verification code has been sent to your registered email address.",
    };
  },
});

export const verifyPaperSubmissionOtp = action({
  args: {
    registrationNumber: v.string(),
    otp: v.string(),
  },

  handler: async (ctx, args) => {
    const registrationNumber = args.registrationNumber.trim();
    const otp = args.otp.trim();

    if (!/^\d{6}$/.test(otp)) {
      throw new ConvexError("Enter a valid 6-digit OTP.");
    }

    const otpHash = createHash("sha256")
      .update(otp)
      .digest("hex");

    // Generate an unpredictable session token.
    const sessionToken = randomBytes(32).toString("hex");
    const sessionTokenHash = createHash("sha256")
      .update(sessionToken)
      .digest("hex");

    const sessionExpiresAt = Date.now() + 30 * 60 * 1000;

    const result = await ctx.runMutation(
      internal.registration.verifyAndCreatePaperSubmissionSession,
      {
        registrationNumber,
        otpHash,
        sessionTokenHash,
        sessionExpiresAt,
      }
    );

    if (!result.success) {
      throw new ConvexError(
        result.message ?? "Unable to verify OTP. Please try again."
      );
    }

    return {
      success: true,
      message: "Registration Number verified successfully. You can now submit your paper.",
      sessionToken,
    };
  },
});
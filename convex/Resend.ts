
import { Email } from "@convex-dev/auth/providers/Email";
import { Resend as ResendAPI } from "resend";
import {
    RandomReader,
    generateRandomString,
} from "@oslojs/crypto/random";
import { verifyAdminEmail } from "./emailTemplate";


export const ResendOTP = Email({
    id: "resend-otp",

    apiKey: process.env.RESEND_API_KEY,

    // OTP expires after 10 minutes
    maxAge: 60 * 10,

    async generateVerificationToken() {
    const random: RandomReader = {
        read(bytes) {
            crypto.getRandomValues(
                new Uint8Array(bytes.buffer as ArrayBuffer, bytes.byteOffset, bytes.byteLength)
            );
        },
    };

    return generateRandomString(random, "0123456789", 6);
},

    async sendVerificationRequest({
        identifier: email,
        provider,
        token,
    }) {
        const resend = new ResendAPI(provider.apiKey);

        const { error } = await resend.emails.send({
            from:
                "ICETIA <conference@icetiaconference.org>",
            to: [email],
            subject: "ICETIA 2027 Admin Email Verification",
            text: verifyAdminEmail({
                email,
                otp_code: token,
            }),
        });

        if (error) {
            throw new Error(JSON.stringify(error));
        }
    },
});

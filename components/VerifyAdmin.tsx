"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
    adminEmail: string;
    onVerified: (sessionToken: string) => void;
}

export default function VerifyAdminOtp({ adminEmail, onVerified }: Props) {

    const verifyOtp = useAction(
        api.paperSubmission.verifyAdminOtp
    );
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sessionToken, setSessionToken] = useState("");
    const router = useRouter();

    // const handleSubmit = async () => {

    //     setError("");
    //     setLoading(true);

    //     try {
    //         const result = await verifyOtp({
    //             email: adminEmail,
    //             otp,
    //         });

    //         const adminId = `admin-${result.adminId.slice(0, 10)}`;

    //         sessionStorage.setItem(
    //             "icetia-admin-session",
    //             result.sessionToken
    //         );

    //         setSessionToken(result.sessionToken);
    //         onVerified(result.sessionToken);
    //         toast.success(result.message);
    //         router.push(`/participants-list/${adminId}`)
    //     } catch (err) {
    //         const rawMessage = err instanceof Error ? err.message : "";

    //         const knownErrors = [
    //             "Enter a valid 6-digit OTP.",
    //             "No valid pending OTP found. Please request a new code.",
    //             "Your OTP has expired. Please request a new code.",
    //             "Too many incorrect attempts. Please request a new code.",
    //             "Incorrect OTP.",
    //             "Registration is not eligible for paper submission.",
    //         ];

    //         setError(
    //             knownErrors.find((message) => rawMessage.includes(message)) ??
    //             "Unable to verify your OTP. Please retry verification again."
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
        const result = await verifyOtp({
            email: adminEmail,
            otp,
        });

        const adminId = `admin-${result.adminId.slice(0, 10)}`;

        sessionStorage.setItem(
            "icetia-admin-session",
            result.sessionToken
        );

        setSessionToken(result.sessionToken);

        toast.success(result.message);

        router.replace(`/participants-list/${adminId}`);
    } catch (err) {
        const rawMessage = err instanceof Error ? err.message : "";

        const knownErrors = [
            "Enter a valid 6-digit OTP.",
            "No valid pending OTP found. Please request a new code.",
            "Your OTP has expired. Please request a new code.",
            "Too many incorrect attempts. Please request a new code.",
            "Incorrect OTP.",
            "Registration is not eligible for paper submission.",
        ];

        setError(
            knownErrors.find((message) => rawMessage.includes(message)) ??
            "Unable to verify your OTP. Please retry verification again."
        );
        toast.error(knownErrors.find((message) => rawMessage.includes(message)))
    } finally {
        setLoading(false);
        setOtp("");
    }
};

    return (
        <div>
            <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter the 6-character verification code sent to your registered
                email address to continue with your paper submission.
            </p>

            <div className="mt-7 flex flex-col items-center rounded-xl bg-slate-50 px-3 py-6 lg:px-6 lg:py-7">
                <p className="mb-5 text-sm font-medium text-slate-700">
                    Enter verification code
                </p>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        value={otp}
                        onChange={setOtp}
                        aria-label="Six-character verification code"
                    >
                        <InputOTPGroup className="gap-1.5 lg:gap-2">
                            <InputOTPSlot
                                index={0}
                                className="h-11 w-10 rounded-lg border border-slate-300 bg-white text-base font-semibold text-slate-900 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 lg:h-12 lg:w-12 lg:text-lg"
                            />
                            <InputOTPSlot
                                index={1}
                                className="h-11 w-10 rounded-lg border border-slate-300 bg-white text-base font-semibold text-slate-900 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 lg:h-12 lg:w-12 lg:text-lg"
                            />
                            <InputOTPSlot
                                index={2}
                                className="h-11 w-10 rounded-lg border border-slate-300 bg-white text-base font-semibold text-slate-900 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 lg:h-12 lg:w-12 lg:text-lg"
                            />
                        </InputOTPGroup>

                        <InputOTPSeparator className="mx-1.5 text-slate-400 lg:mx-2" />

                        <InputOTPGroup className="gap-1.5 lg:gap-2">
                            <InputOTPSlot
                                index={3}
                                className="h-11 w-10 rounded-lg border border-slate-300 bg-white text-base font-semibold text-slate-900 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 lg:h-12 lg:w-12 lg:text-lg"
                            />
                            <InputOTPSlot
                                index={4}
                                className="h-11 w-10 rounded-lg border border-slate-300 bg-white text-base font-semibold text-slate-900 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 lg:h-12 lg:w-12 lg:text-lg"
                            />
                            <InputOTPSlot
                                index={5}
                                className="h-11 w-10 rounded-lg border border-slate-300 bg-white text-base font-semibold text-slate-900 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 lg:h-12 lg:w-12 lg:text-lg"
                            />
                        </InputOTPGroup>
                    </InputOTP>

                    <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                        Check your inbox and spam folder if you cannot find the code.
                    </p>



                    <button
                        type="submit"
                        disabled={loading || otp.length !== 6 || !!sessionToken}
                        className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-3
    text-sm font-semibold text-white disabled:opacity-60"
                    >
                        {loading ? "Verifying OTP..." : "Verify OTP"}
                    </button>
                </form>
            </div>

            

        </div>
    )
}
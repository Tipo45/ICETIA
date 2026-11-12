"use client"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
    adminEmail: string;
}

export default function VerifySuperAdminOtp({ adminEmail }: Props) {

    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { signIn } = useAuthActions();
    const { isAuthenticated, isLoading: authLoading } = useConvexAuth();

    const currentAdmin = useQuery(
        api.registration.getCurrentAdmin,
        isAuthenticated ? {} : "skip"
    );

    useEffect(() => {
        if (!isAuthenticated || !currentAdmin) return;

        const adminId = `admin-${currentAdmin.id.slice(0, 10)}`;

        // const destination = `/admin/super-admin/${adminId}`;


        // console.log("Redirecting to:", destination);
        router.replace(`/admin/super-admin/${adminId}`);
        // toast.success("Login successful!");

    }, [isAuthenticated, currentAdmin, router]);

    const handleSubmit = async () => {
        setError("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.set("email", adminEmail);
            formData.set("code", code.trim());

            const result = await signIn("resend-otp", formData);

            if (!result.signingIn) {
                setError("Unable to complete login. Please try again.");
            }

        } catch (err) {
            const rawMessage = err instanceof Error ? err.message : "";

            const knownErrors = [
                "Enter a valid 6-digit OTP.",
                "No valid pending OTP found. Please request a new code.",
                "Your OTP has expired. Please request a new code.",
                "Too many incorrect attempts. Please request a new code.",
                "Incorrect OTP.",
                "Email has no admin privileges.",
            ];

            setError(
                knownErrors.find((message) => rawMessage.includes(message)) ??
                "Unable to verify your OTP. Please retry verification again."
            );
            toast.error(knownErrors.find((message) => rawMessage.includes(message)))
        } finally {
            setLoading(false);
            setCode("");
        }
    };

    // const handleVerifyOtp = async () => {
    //     if (code.length !== 6) {
    //         toast.error("Enter the complete 6-digit verification code.");
    //         return;
    //     }

    //     // setIsSubmitting(true);

    //     try {
    //         const formData = new FormData();
    //         formData.set("email", adminEmail.trim());
    //         formData.set("code", code.trim());

    //         const result = await signIn("resend-otp", formData);

    //         console.log("OTP verification result:", result);

    //         if (!result.signingIn) {
    //             toast.error("Verification was unsuccessful. Check your OTP.");
    //             return;
    //         }

    //         toast.success("OTP verified successfully!");

    //         // Authentication state will update.
    //         // Your existing authenticated-user redirect effect handles navigation.

    //     } catch (error) {
    //         console.error("OTP verification error:", error);
    //         toast.error(
    //             error instanceof Error
    //                 ? error.message
    //                 : "OTP verification failed."
    //         );
    //     } finally {
    //         // setIsSubmitting(false);
    //     }
    // };

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
                    // handleVerifyOtp();
                }}>
                    <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        value={code}
                        onChange={setCode}
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
                        disabled={loading || code.length !== 6}
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
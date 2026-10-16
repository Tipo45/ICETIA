"use client";

import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CiCircleQuestion } from "react-icons/ci";
import { validateRegNumber } from "./types/validation";
import { toast } from "sonner";
import VerifyPaperSubmissionOtp from "./verifyPaperSubmissionOtp";

interface Props {
    onVerified: (sessionToken: string) => void;
}

export default function VerifyRegistrationForm({ onVerified }: Props) {
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [sessionToken, setSessionToken] = useState("");
    const requestOtp = useAction(
        api.paperSubmission.requestPaperSubmissionOtp
    );


    const isFormValid = () => {
        return (
            !validateRegNumber(registrationNumber)
        )

    }

    const handleSubmit = async () => {

        setMessage("");
        setError("");
        setShowOtp(false);
        setLoading(true);

        try {
            const result = await requestOtp({
                registrationNumber: registrationNumber.trim(),
            });

            setMessage(result.message);
            setShowOtp(true);
            toast.success(result.message)
        }
        catch (err) {
            const rawMessage =
                err instanceof Error ? err.message : "";

            const knownErrors = [
                "Please enter your registration number.",
                "Registration not found.",
                "Only registered authors can submit papers.",
                "Payment must be confirmed before paper submission.",
                "Unable to send the verification email. Please try again.",
            ];

            const matchedError = knownErrors.find((message) =>
                rawMessage.includes(message)
            );

            setError(
                matchedError ??
                "We couldn't process your request. Please try again."
            );
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }} className="mx-auto w-full max-w-xl">
                <label
                    htmlFor="registrationNumber"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                >
                    Registration Number <span className="text-red-600">*</span>
                </label>

                <input
                    id="registrationNumber"
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => {
                        setRegistrationNumber(e.target.value);
                        setMessage("");
                        setError("");
                        setShowOtp(false);
                    }}
                    placeholder="ICETIA2027-G7248E2C"
                    autoComplete="off"
                    maxLength={19}
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                    type="submit"
                    disabled={!isFormValid() || loading}
                    className="mt-4 w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Checking Registration..." : "Verify Registration"}
                </button>


                <div className="mt-4 flex items-start gap-2 text-sm leading-6 text-gray-600">
                    <CiCircleQuestion className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
                    <p>
                        Check the inbox of the email you used during registration for your unique
                        registration number, or contact{" "}
                        <a
                            href="/support"
                            className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
                        >
                            Support
                        </a>{" "}
                        for assistance.
                    </p>
                </div>


                {message && (
                    <p
                        role="status"
                        className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700"
                    >
                        {message}
                    </p>
                )}

                {error && (
                    <p
                        role="alert"
                        className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                    >
                        {error}
                    </p>
                )}
            </form>
            {showOtp && (<VerifyPaperSubmissionOtp registrationNumber={registrationNumber} onVerified={(token) => {
                setSessionToken(token);
                setIsVerified(true);
                onVerified(token);
            }} />)}
        </div>
    );
}

"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  LuCheck,
  LuLoaderCircle,
  LuShieldCheck,
  LuCircleAlert,
  LuRefreshCw,
} from "react-icons/lu";
import { toast } from "sonner";

interface PaymentVerificationProps {
  reference: string;
  registrationId: string;
  initialResult?: {
    success?: boolean;
    status?: string;
    message?: string;
  } | null;
}

type VerificationStatus = "verifying" | "success" | "error";

export default function PaymentVerification({
  reference,
  registrationId,
  initialResult,
}: PaymentVerificationProps) {
  const router = useRouter();

  const verifyAndConfirmPayment = useAction(
    api.verify.verifyAndConfirmPayment
  );

  const [status, setStatus] =
    useState<VerificationStatus>("verifying");

  const [attempt, setAttempt] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  // Prevent duplicate requests while one is in progress.
  const verificationInProgress = useRef(false);

  // Prevent automatic verification from running more than once
  // when the component mounts.
  const initialVerificationStarted = useRef(false);

  const verifyPayment = useCallback(async () => {
    if (!reference || !registrationId) {
      setStatus("error");
      toast.error("Payment reference or registration ID is missing.");
      return;
    }

    // Prevent simultaneous verification requests.
    if (verificationInProgress.current) return;

    verificationInProgress.current = true;
    setIsVerifying(true);
    setStatus("verifying");

    try {
      const result = await verifyAndConfirmPayment({
        registrationId: registrationId as Id<"registrations">,
        reference,
      });

      console.log("Payment verification result:", result);

      if (result.success) {
        setStatus("success");
        toast.success(
          result.alreadyPaid
            ? "Your payment has already been confirmed."
            : "Payment verified successfully."
        );

        router.replace(
          `/registration/success/${registrationId}`
        );
      } else {
        setStatus("error");

        toast.error(
          "Payment could not be confirmed. You can check again."
        );
      }
    } catch (error) {
      console.error("Payment verification failed:", error);

      setStatus("error");

      toast.error(
        error instanceof Error
          ? "We couldn't confirm your payment. Please try again."
          : "An unexpected verification error occurred."
      );
    } finally {
      verificationInProgress.current = false;
      setIsVerifying(false);
    }
  }, [
    reference,
    registrationId,
    verifyAndConfirmPayment,
    router,
  ]);

  // Automatically verify the payment when the page first loads.
  useEffect(() => {
    if (initialVerificationStarted.current) return;

    initialVerificationStarted.current = true;
    void verifyPayment();
  }, [verifyPayment]);

  // Retry verification when the user clicks the button.
  useEffect(() => {
    if (attempt === 0) return;

    void verifyPayment();
  }, [attempt, verifyPayment]);

  const paymentVerified = status === "success";
  const hasError = status === "error";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 lg:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <main className="relative w-full max-w-lg overflow-hidden border border-white/10 bg-[#080f1a] shadow-2xl shadow-black/20">
        <div className="px-6 py-10 text-center lg:px-10 lg:py-12">
          {/* Status icon */}
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border ${
              paymentVerified
                ? "border-emerald-400/20 bg-emerald-400/10"
                : hasError
                  ? "border-rose-400/20 bg-rose-400/10"
                  : "border-blue-400/20 bg-blue-400/10"
            }`}
          >
            {paymentVerified ? (
              <LuCheck className="h-9 w-9 text-emerald-400" />
            ) : hasError ? (
              <LuCircleAlert className="h-9 w-9 text-rose-400" />
            ) : (
              <LuLoaderCircle className="h-9 w-9 animate-spin text-blue-400" />
            )}
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {paymentVerified
              ? "Payment Verified Successfully"
              : hasError
                ? "Payment Confirmation Pending"
                : "Verifying Your Payment"}
          </h1>

          {/* Description */}
          <p
            aria-live="polite"
            className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400"
          >
            {paymentVerified ? (
              <>
                Your payment has been successfully confirmed, and your
                registration status has been updated.

                <br />

                <span className="mt-2 inline-block text-slate-500">
                  Taking you to your registration...
                </span>
              </>
            ) : hasError ? (
              <>
                We could not confirm your payment automatically. Your
                registration has not been deleted. You can retry
                verification below.
              </>
            ) : (
              <>
                Please wait while we securely verify your transaction
                with Paystack and confirm your ICETIA 2027 registration.
              </>
            )}
          </p>

          {/* Transaction reference */}
          <div className="mt-7 border border-white/10 bg-white/3 px-4 py-3 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Transaction reference
            </p>

            <p className="mt-1 break-all font-mono text-xs text-slate-300">
              {reference}
            </p>
          </div>

          {/* Progress steps */}
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10 text-left">
            {/* Step 1 */}
            <div className="flex items-center gap-3 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                <LuCheck className="h-4 w-4 text-emerald-400" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  Registration submitted
                </p>

                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  Your registration details have been saved.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 py-4">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  paymentVerified
                    ? "bg-emerald-400/10"
                    : hasError
                      ? "bg-rose-400/10"
                      : "bg-blue-400/10"
                }`}
              >
                {paymentVerified ? (
                  <LuCheck className="h-4 w-4 text-emerald-400" />
                ) : hasError ? (
                  <LuCircleAlert className="h-4 w-4 text-rose-400" />
                ) : (
                  <LuLoaderCircle className="h-4 w-4 animate-spin text-blue-400" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  {paymentVerified
                    ? "Payment verified"
                    : hasError
                      ? "Payment not yet confirmed"
                      : "Confirming payment"}
                </p>

                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  {paymentVerified
                    ? "Paystack confirmed your successful transaction."
                    : hasError
                      ? "Your registration is retained while you check the transaction."
                      : "Verifying the transaction directly with Paystack."}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className={`flex items-center gap-3 py-4 ${
                paymentVerified ? "" : "opacity-50"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                  paymentVerified ? "bg-emerald-400/10" : "bg-white/5"
                }`}
              >
                {paymentVerified ? (
                  <LuCheck className="h-4 w-4 text-emerald-400" />
                ) : (
                  <LuShieldCheck className="h-4 w-4 text-slate-400" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  {paymentVerified
                    ? "Registration confirmed"
                    : "Registration confirmation"}
                </p>

                <p className="mt-0.5 text-xs leading-5 text-slate-500">
                  {paymentVerified
                    ? "Your registration is ready to view."
                    : "This step completes after payment verification."}
                </p>
              </div>
            </div>
          </div>

          {/* Verification notice or retry button */}
          {isVerifying ? (
            <div className="mt-7 flex items-start gap-3 border border-blue-400/10 bg-blue-400/5 px-4 py-3 text-left">
              <LuShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

              <p className="text-xs leading-5 text-slate-400">
                Your payment is being checked securely. Please wait
                for the verification result before leaving this page.
              </p>
            </div>
          ) : hasError ? (
            <div className="mt-7 space-y-3">
              <div className="border border-amber-400/10 bg-amber-400/5 px-4 py-3 text-left">
                <p className="text-xs leading-5 text-slate-400">
                  A verification error does not necessarily mean your
                  payment failed. If you have already paid, check again
                  before attempting another payment.
                </p>
              </div>

              <button
                type="button"
                disabled={isVerifying}
                onClick={() => {
                  setAttempt((previous) => previous + 1);
                }}
                className="inline-flex w-full items-center justify-center gap-2 bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LuRefreshCw className="h-4 w-4" />
                Check payment again
              </button>
            </div>
          ) : paymentVerified ? (
            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-emerald-400">
              <LuCheck className="h-4 w-4" />
              <span>Payment confirmed. Redirecting shortly...</span>
            </div>
          ) : null}

          <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-slate-600">
            ICETIA 2027 · Federal University Otuoke
          </p>
        </div>
      </main>
    </section>
  );
}

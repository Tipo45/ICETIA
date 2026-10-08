"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LuCheck,
  LuLoaderCircle,
  LuShieldCheck,
} from "react-icons/lu";
import { toast } from "sonner";

interface PaymentVerificationProps {
  reference: string;
  amount: number;
  email: string;
  registrationId: string;
}

export default function PaymentVerification({
  reference,
  amount,
  email,
  registrationId,
}: PaymentVerificationProps) {
  const router = useRouter();

  const [paymentVerified, setPaymentVerified] = useState(false);

  useEffect(() => {
    const paymentInfo = JSON.parse(
      localStorage.getItem("paymentInfo") || "{}"
    );

    if (
      paymentInfo.amount !== amount / 100 ||
      paymentInfo.userEmail !== email
    ) {
      toast.error("Payment Verification Error");
    } else {
      toast.success("Payment Verification Successful");

      // Update UI
      setPaymentVerified(true);

      const timer = setTimeout(() => {
        router.push(`/registration/success/${registrationId}`);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [router, amount, email, registrationId]);

  return (
    <section>
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="relative w-full max-w-lg overflow-hidden border border-white/10 bg-[#080f1a]">
          {/* Background glow */}
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative px-6 py-12 text-center lg:px-10 lg:py-14">
            {/* Status Icon */}
            <div
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border ${
                paymentVerified
                  ? "border-emerald-400/20 bg-emerald-400/5"
                  : "border-blue-400/20 bg-blue-400/5"
              }`}
            >
              {paymentVerified ? (
                <LuCheck className="h-9 w-9 text-emerald-400" />
              ) : (
                <LuLoaderCircle className="h-9 w-9 animate-spin text-blue-400" />
              )}
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-2xl font-bold tracking-tight text-white lg:text-3xl">
              {paymentVerified
                ? "Payment Verified Successfully"
                : `Verifying your payment with Reference ID: ${reference}`}
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">
              {paymentVerified ? (
                <>
                  Your payment of ₦{amount.toLocaleString()} has been
                  successfully verified.
                  <br />
                  <span className="text-slate-500">
                    Redirecting you to complete your registration...
                  </span>
                </>
              ) : (
                <>
                  Please, {email} wait while we confirm your payment of ₦
                  {amount.toLocaleString()} and complete your registration
                  for ICETIA 2027.
                </>
              )}
            </p>

            {/* Status */}
            <div className="mx-auto mt-8 max-w-sm divide-y divide-white/10 border-y border-white/10 text-left">
              {/* Payment initiated */}
              <div className="flex items-center gap-3 py-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                  <LuCheck className="h-4 w-4 text-emerald-400" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Payment initiated
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Your payment request has been received.
                  </p>
                </div>
              </div>

              {/* Confirming payment */}
              <div className="flex items-center gap-3 py-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    paymentVerified
                      ? "bg-emerald-400/10"
                      : "bg-blue-400/10"
                  }`}
                >
                  {paymentVerified ? (
                    <LuCheck className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <LuLoaderCircle className="h-4 w-4 animate-spin text-blue-400" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    {paymentVerified
                      ? "Payment verified"
                      : "Confirming payment"}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {paymentVerified
                      ? "Your payment has been successfully confirmed."
                      : "We are waiting for payment confirmation."}
                  </p>
                </div>
              </div>

              {/* Registration confirmed */}
              <div
                className={`flex items-center gap-3 py-4 ${
                  paymentVerified ? "" : "opacity-50"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    paymentVerified
                      ? "bg-emerald-400/10"
                      : "bg-white/5"
                  }`}
                >
                  {paymentVerified ? (
                    <LuCheck className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <LuShieldCheck className="h-4 w-4 text-slate-400" />
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    {paymentVerified
                      ? "Registration confirmed"
                      : "Registration confirmation pending"}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {paymentVerified
                      ? "Your registration is being completed."
                      : "This will update once your payment is verified."}
                  </p>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="mt-8 border border-blue-400/10 bg-blue-400/5 px-4 py-3">
              <p className="text-xs leading-5 text-slate-400">
                {paymentVerified
                  ? "Payment verified. You will be redirected shortly."
                  : "Please do not close this page or refresh your browser while your payment is being verified."}
              </p>
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-slate-600">
              ICETIA 2027 · Federal University Otuoke
            </p>
          </div>
        </div>
      </main>
    </section>
  );
}
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export async function POST(request: Request) {
  try {
    console.log("Payment API Request Received");

    const { email, amount, registrationId } = await request.json();

    if (!email || !amount || !registrationId) {
      return NextResponse.json(
        { error: "Email, amount, and registration ID are required." },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

    if (!secretKey || !convexUrl) {
      console.error("Paystack or Convex environment variable is missing.");

      return NextResponse.json(
        { error: "Payment service is not configured." },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // const siteUrl = "http://localhost:3000";

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          callback_url: `${siteUrl}/registration/verify-payment?registrationId=${encodeURIComponent(
            registrationId
          )}`,
        }),
      }
    );

    const paystackResult: PaystackResponse = await response.json();

    if (
      !response.ok ||
      !paystackResult.status ||
      !paystackResult.data?.reference ||
      !paystackResult.data?.authorization_url
    ) {
      console.error(
        "Failed to initialize Paystack transaction:",
        paystackResult
      );

      return NextResponse.json(
        { error: "Could not initialize Paystack payment." },
        { status: 502 }
      );
    }

    // Connect to Convex.
    const convex = new ConvexHttpClient(convexUrl);

    // Save the Paystack reference to the existing registration.
    await convex.mutation(api.payment.savePaymentReference, {
      registrationId: registrationId as Id<"registrations">,
      paymentReference: paystackResult.data.reference,
    });

    console.log("Paystack transaction initialized successfully.");

    // Return the Paystack response to the frontend.
    return NextResponse.json(paystackResult);
  } catch (error) {
    console.error("Payment API Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    console.log("Payment API Request Processed");
  }
}
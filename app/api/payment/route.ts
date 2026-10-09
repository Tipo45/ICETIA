import { NextResponse } from "next/server";

interface PaystackResponse {
    status: string;
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
        const response = await fetch("https://api.paystack.co/transaction/initialize",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    amount,
                    // callback_url: `http://localhost:3000/registration/verify-payment?registrationId=${registrationId}`,
                    callback_url: `http://icetia.vercel.app/registration/verify-payment/${registrationId}`,
                    // callback_url: `http://icetia.org/registration/verify-payment/${registrationId}`,
                }),
            }
        );

        if(!response.ok) {
            console.log("Failed response from Paystack:", response.statusText);
            console.log("Failed response from paystack:", response);
            return NextResponse.json(
                { error: "Faileed to initialize paystack transaction" },
                { status: response.status }
            )

        }
        
const result: PaystackResponse = await response.json()
console.log("Paystack Initialization Result", result);
return NextResponse.json(result);
    } catch (error) {
        console.log("Payment API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" },
            { status: 500 }
        )
    } finally {
        console.log("Payment API Request Processed")
    }
}
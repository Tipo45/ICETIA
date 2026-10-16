
import PaymentVerification from "@/components/verify-payment";

export default async function VerifyPayment({searchParams}:{ searchParams: Promise<{ [key: string]: string }>;}) {
  const { reference, registrationId } = await searchParams;

  if (!reference || !registrationId) {
    return <p>Missing payment reference or registration ID.</p>;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://icetia.vercel.app";


// const siteUrl ="https://icetiaconference.org";

 let verificationResult = null;

  try {
    const response = await fetch(
      `${siteUrl}/api/verify-payment/${encodeURIComponent(reference)}`,
      { cache: "no-store" }
    );

    verificationResult = await response.json();

    console.log("Payment verification result:", verificationResult);
  } catch (error) {
    console.error("Payment verification request failed:", error);
  }
 

  return (
    <section>
      <PaymentVerification reference={reference} registrationId={registrationId} initialResult={verificationResult}  />
    </section>
  );
}
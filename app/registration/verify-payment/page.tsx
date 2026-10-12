
import PaymentVerification from "@/components/verify-payment";

export default async function VerifyPayment({searchParams}:{ searchParams: Promise<{ [key: string]: string }>;}) {
  const { reference, registrationId } = await searchParams;

  if (!reference || !registrationId) {
    return <p>Missing payment reference or registration ID.</p>;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://icetia.vercel.app";


// const siteUrl ="https://icetiaconference.org";

  const response = await fetch(
    `${siteUrl}/api/verify-payment/${reference}`,
  );

  const result = await response.json();
  console.log("payment verification result:", result)

 

  return (
    <section>
      <PaymentVerification reference={reference} registrationId={registrationId}  />
    </section>
  );
}
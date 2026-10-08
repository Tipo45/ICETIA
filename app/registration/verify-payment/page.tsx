
import PaymentVerification from "@/components/verify-payment";

export default async function VerifyPayment({searchParams}:{ searchParams: Promise<{ [key: string]: string }>;}) {
  const { reference, registrationId } = await searchParams;

  const response = await fetch(
    `http://localhost:3000/api/verify-payment/${reference}`,
  );

  // const response = await fetch(
  //   `https://icetia.vercel.app/api/verify-payment/${reference}`,   );

  // const response = await fetch(
  //   `https://icetia.org/api/verify-payment/${reference}`,   );

  const result = await response.json();
  console.log("payment verification result:", result)

 

  return (
    <section>
      <PaymentVerification reference={reference} amount={result.data.amount} email={result.data.customer.email} registrationId={registrationId}  />
    </section>
  );
}
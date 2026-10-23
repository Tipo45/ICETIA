export type RegistrationConfirmationEmailProps = {
  firstName: string;
  lastName: string;
  email: string;
  category: "author" | "participant" | "student";
  amountPaid: number;

  coAuthors?: {
    firstName: string;
    lastName: string;
    email?: string;
    institution?: string;
    country?: string;
    department?: string;
    degree?: string;
  }[];
};

export type TicketEmailProps = {
  firstName: string;
  registrationNumber: string;
  qrCode: string;
};

export type VerifyIdEmailProps = {
  registrationNumber: string;
  otp_code: string;
}

export type VerifyAdminEmailProps = {
  email: string;
  otp_code: string;
}

export type ReminderEmailProps = {
  firstName: string;
  registrationNumber: string;
}

export function registrationConfirmationEmail({
  firstName,
  lastName,
  email,
  category,
  amountPaid,
  coAuthors,
}: RegistrationConfirmationEmailProps): string {

  const coAuthorSection =
    category === "author" &&
      coAuthors &&
      coAuthors.length > 0
      ? `
Co-Authors
${coAuthors
        .map(
          (author, index) => `
${index + 1}. ${author.firstName} ${author.lastName}
   Email: ${author.email ?? "-"}
   Institution: ${author.institution ?? "-"}
   Country: ${author.country ?? "-"}
   Department: ${author.department ?? "-"}
   Degree: ${author.degree ?? "-"}
`
        )
        .join("\n")}
`
      : "";

  return `
Dear ${firstName || 'Participant'},

Thank you for registering for ICETIA 2027. We are excited to have you join us for the first International Conference on Emerging Technologies, Innovations and Applications.

Registration Details:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Category: ${category.charAt(0).toUpperCase() + category.slice(1)}
- Amount Paid: ₦${amountPaid.toLocaleString()}

${coAuthorSection}

You will receive your ticket and further instructions via email shortly. Please ensure to check your inbox and spam folder.

For more information, please visit our website or contact us at conference@icetiaconference.org.

We look forward to welcoming you to the conference!

Best regards,
ICETIA 2027 Organizing Committee
`
}

export function ticketEmail({
  firstName,
  registrationNumber,
  qrCode,
}: TicketEmailProps) {
  return `
  <h2>Your ICETIA 2027 Conference Ticket</h2>

<p>Dear ${firstName},</p>

<p>
  Thank you for successfully registering for
  <strong>ICETIA 2027</strong>. We are delighted to welcome you to the conference.
</p>

<h3>Conference Details</h3>

<p>
  <strong>📅 Date:</strong> 28th - 30th April, 2027
</p>

<p>
  <strong>🕘 Time:</strong> TBA AM (WAT)
</p>

<p>
  <strong>📍 Venue:</strong><br/>
  TBA,<br/>
  Federal University Otuoke, Ogbia<br/>
  Bayelsa State, Nigeria
</p>

<h3>Your Registration</h3>

<p>
  <strong>Registration Number:</strong><br/>
  ${registrationNumber}
</p>

<p>
  Please present the QR code below during conference check-in.
</p>

<img
  src="${qrCode}"
  width="220"
  height="220"
  alt="ICETIA 2027 Conference QR Code"
  style="display:block; width:220px; height:220px;"
/>

<p>
  This QR code is unique to your registration and will be scanned at the entrance.
</p>

<p>
  Please keep this email safe. It serves as your official conference ticket.
</p>

<p>
  If you have any questions, kindly contact conference@icetiaconference.org.
</p>

<p>
  We look forward to welcoming you to <strong>ICETIA 2027</strong>.
</p>

<p>
  Best regards,<br/>
  <strong>ICETIA 2027 Organizing Committee</strong>
</p>`;
}

export function verifyId({
  registrationNumber,
  otp_code
}: VerifyIdEmailProps) {
  return `
  Dear Author,

  A request was made to verify your registration ID: ${registrationNumber}, for paper submission at the International Conference on Emerging Technologies and Intelligent Applications (ICETIA 2027).
  
  To verify your identity and continue with your paper submission, please use the One-Time Password (OTP) below:

  ${otp_code}
  
  This code will expire in 10 minutes. For your security, please do not share it with anyone.
  
  If you did not initiate this request, you can safely ignore this email. No changes will be made to your registration.

  Thank you for your interest in ICETIA 2027. We look forward to receiving your research contribution.
  
   Best regards,
  ICETIA 2027 Organizing Committee
  `
}

export function verifyAdminEmail({
  email,
  otp_code
}: VerifyAdminEmailProps) {
  return `
  Dear Author,

  A request was made to verify your email: ${email}, for admin privileges at the International Conference on Emerging Technologies and Intelligent Applications (ICETIA 2027).
  
  To verify your identity and proceed, please use the One-Time Password (OTP) below:

  ${otp_code}
  
  This code will expire in 10 minutes. For your security, please do not share it with anyone.
  
  If you did not initiate this request, you can safely ignore this email. No changes will be made to your registration.

  Thank you for your interest in ICETIA 2027. We look forward to receiving your research contribution.
  
   Best regards,
  ICETIA 2027 Organizing Committee
  `
}

export function reminderEmail({
  firstName,
  registrationNumber
}: ReminderEmailProps) {
  return `
 Dear ${firstName},

This is a friendly reminder that you are successfully registered for the International Conference on Emerging Technologies, Innovations and Applications (ICETIA 2027).

Conference Details
──────────────────────────
📅 Date: 28th - 30th April, 2027
🕘 Time: TBA
📍 Venue: TBA, Federal University Otuoke, Ogbia, Bayelsa State, Nigeria

Your Registration Details
──────────────────────────
Registration Number: ${registrationNumber}

Please keep your registration number safe and present your conference ticket (QR code) during check-in.

We recommend arriving at least 30 minutes before the event begins to complete registration and seating.

If you have any questions or require assistance, please contact support@ICETIA2027.com.

We look forward to welcoming you and hope you have a rewarding conference experience.

Best regards,

ICETIA 2027 Organizing Committee`
}
type RegistrationConfirmationEmailProps = {
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

type TicketEmailProps = {
  firstName: string;
  registrationNumber: string;
  qrCode: string;
};

type ReminderEmailProps = {
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

Thank you for registering for ICETIA 2026. We are excited to have you join us for this International Conference on Emerging Technologies, Innovation, and Application.

Registration Details:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Category: ${category.charAt(0).toUpperCase() + category.slice(1)}
- Amount Paid: ₦${amountPaid.toLocaleString()}

${coAuthorSection}

You will receive your ticket and further instructions via email shortly. Please ensure to check your inbox and spam folder.

For more information, please visit our website or contact us at support@icetia2026.com.

We look forward to welcoming you to the conference!

Best regards,
The ICETIA 2026 Team
`
}

export function ticketEmail({
  firstName,
  registrationNumber,
  qrCode,
}: TicketEmailProps) {
  return `
  <h2>Your ICETIA 2026 Conference Ticket</h2>

<p>Dear ${firstName},</p>

<p>
  Thank you for successfully registering for
  <strong>ICETIA 2026</strong>. We are delighted to welcome you to the conference.
</p>

<hr>

<h3>Conference Details</h3>

<p>
  <strong>📅 Date:</strong> 24-25 November, 2026
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

<hr>

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
  alt="Conference QR Code"
/>

<p>
  This QR code is unique to your registration and will be scanned at the entrance.
</p>

<hr>

<p>
  Please keep this email safe. It serves as your official conference ticket.
</p>

<p>
  If you have any questions, kindly contact support@icetia2026.com.
</p>

<p>
  We look forward to welcoming you to <strong>ICETIA 2026</strong>.
</p>

<p>
  Best regards,<br/>
  <strong>ICETIA 2026 Organizing Committee</strong>
</p>`;
}

export function reminderEmail({
  firstName,
  registrationNumber
}: ReminderEmailProps) {
  return `
 Dear ${firstName},

This is a friendly reminder that you are successfully registered for the International Conference on Emerging Trends in Information Technology and Artificial Intelligence (ICETIA 2026).

Conference Details
──────────────────────────
📅 Date: 24-25 November, 2026
🕘 Time: TBA
📍 Venue:
TBA,
Federal University Otuoke, Ogbia,
Bayelsa State, Nigeria

Your Registration Details
──────────────────────────
Registration Number: ${registrationNumber}

Please keep your registration number safe and present your conference ticket (QR code) during check-in.

We recommend arriving at least 30 minutes before the event begins to complete registration and seating.

If you have any questions or require assistance, please contact support@icetia2026.com.

We look forward to welcoming you and hope you have a rewarding conference experience.

Best regards,

ICETIA 2026 Organizing Committee`
}
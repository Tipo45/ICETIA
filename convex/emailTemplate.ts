type RegistrationConfirmationEmailProps = {
  firstName: string;
  lastName: string;
  email: string;
  category: string;
  amountPaid: number;
};

type TicketEmailProps = {
  registrationNumber: string;
  qrCode: string;
};

export function registrationConfirmationEmail({
  firstName,
  lastName,
  email,
  category,
  amountPaid,
}: RegistrationConfirmationEmailProps): string {
    return `
Dear ${firstName || 'Participant'},

Thank you for registering for ICETIA 2026. We are excited to have you join us for this International Conference on Emerging Technologies, Innovation, and Application.

Registration Details:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Category: ${category.charAt(0).toUpperCase() + category.slice(1)}
- Amount Paid: ₦${amountPaid.toLocaleString()}

You will receive your ticket and further instructions via email shortly. Please ensure to check your inbox and spam folder.

For more information, please visit our website or contact us at support@icetia2026.com.

We look forward to welcoming you to the conference!

Best regards,
The ICETIA 2026 Team
`
}

export function ticketEmail({
  registrationNumber,
  qrCode,
}: TicketEmailProps) {
  return `
  <h2>Your ICETIA 2026 Conference Ticket</h2>

  <p>Thank you for registering.</p>

  <p>
    <strong>Registration Number:</strong>
    ${registrationNumber}
  </p>

  <p>Please present this QR code during conference check-in.</p>

  <img
      src="${qrCode}"
      width="220"
      height="220"
      alt="Conference QR Code"
  />

  <p>
    Keep this email safe. It serves as your conference ticket.
  </p>
  `;
}
export type RegistrationConfirmationEmailProps = {
  registrationNumber: string;
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
  registrationNumber: string;
  paymentStatus: string;
}

export type editorialInviteProps = {
  name: string;
  role: string;
}

export type editorialAcceptanceProps = {
  name: string;
  email: string;
  role: string;
}

export function registrationConfirmationEmail({
  registrationNumber
}: RegistrationConfirmationEmailProps): string {

  return `
Dear Participant,

Thank you for registering for the First International Conference on Emerging Technologies, Innovations and Applications (ICETIA 2027), hosted by Federal University Otuoke, Bayelsa State, Nigeria, from 28–30 April 2027.

We are pleased to confirm that your registration and payment have been successfully received and verified.

Participant Reference: ${registrationNumber}
Registration Status: Confirmed
Payment Status: Paid

Your place at ICETIA 2027 is now fully confirmed.

Conference Details:
Dates: 28–30 April 2027
Format: Hybrid
Venue: Federal University Otuoke, Bayelsa State, Nigeria
Website: https://www.icetiaconference.org/

Please quote your Participant Reference in any future correspondence with the ICETIA 2027 Secretariat regarding your registration.

Further information regarding the conference programme, session arrangements, accreditation and participant logistics will be communicated before the event.

Please retain this email as confirmation of your registration and payment.

Thank you for your participation. We look forward to welcoming you to ICETIA 2027.

Kind regards,

ICETIA 2027 Organizing Committee
Federal University Otuoke, Nigeria
conference@icetiaconference.org
https://www.icetiaconference.org/
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
  <strong>🕘 Time:</strong> 9:00AM (WAT)
</p>

<p>
  <strong>📍 Venue:
  Federal University Otuoke, Ogbia<br/>
  Bayelsa State, Nigeria
</p>

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
  ICETIA 2027 Organizing Committee<br/>
Federal University Otuoke, Nigeria<br/>
conference@icetiaconference.org<br/>
https://www.icetiaconference.org/
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
  Dear Admin,

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
  registrationNumber,
  paymentStatus
}: ReminderEmailProps) {
  return `
 Dear Participant,

This is a friendly reminder regarding your registration for the First International Conference on Emerging Technologies, Innovations and Applications (ICETIA 2027), hosted by Federal University Otuoke, Bayelsa State, Nigeria.

Participant Reference: ${registrationNumber}

Conference Details:
Date: 28 - 30 April, 2027
Time: TBA
Venue: Federal University Otuoke, Bayelsa State, Nigeria
Format: Hybrid, with physical and online participation
Website: https://www.icetiaconference.org/



Theme:
“Advancing Emerging Technologies, Innovation and Applications for Sustainable Digital Transformation.”

Please ensure that your registration and payment requirements are completed within the applicable deadlines.

Registration Status: Confirmed
Payment Status: ${paymentStatus} Paid   Pending / Waived

If your payment status is Pending, kindly complete the applicable registration payment once the official payment facility is available. Participants whose registration and payment have already been confirmed do not need to take any further action at this stage.

Further information regarding the detailed conference programme, presentation schedules, accreditation, virtual participation arrangements and other logistics will be communicated to registered participants before the conference.

Please quote your Participant Reference in any correspondence with the ICETIA 2027 Secretariat.

Thank you for your continued interest in ICETIA 2027. We look forward to welcoming you in April 2027.

Kind regards,

ICETIA 2027 Organizing Committee
Federal University Otuoke, Nigeria
conference@icetiaconference.org
https://www.icetiaconference.org/`
}

export function editorInvite ({
  name,
  role
}: editorialInviteProps) {
  return `
  Dear ${name},
  

On behalf of the Organising Committee of the International Conference on Emerging Technologies, Innovations & Applications (ICETIA 2027), we are pleased to invite you to serve as a ${role} for the maiden edition of our conference.


On behalf of the Organising Committee of the International Conference on Emerging Technologies, Innovations & Applications (ICETIA 2027), we are pleased to invite you to serve as a ${role} for the maiden edition of our conference.

ICETIA 2027 will be held from 28th – 30th April 2027 at the Federal University Otuoke, Bayelsa State, Nigeria, with provisions for on-site and hybrid participation

Given your academic background, professional experience, and contributions to your field, we believe your expertise would be invaluable to the success of this conference.

Given your academic background, professional experience, and contributions to your field, we believe your expertise would be invaluable to the success of this conference.

As a ${role}, your responsibilities will include:

- Overseeing the evaluation and review process for assigned submissions.

- Coordinating reviewers and monitoring review progress.

- Providing editorial recommendations on submitted manuscripts.

- Ensuring that submissions meet the conference's academic and publication standards.

We would be honoured to have you join the ICETIA 2027 academic team and contribute to advancing research, innovation, and collaboration.

We would be honoured to have you join the ICETIA 2027 academic team and contribute to advancing research, innovation, and collaboration.

Kindly confirm your acceptance of this invitation by replying to this email. Upon acceptance, further information regarding your role and access to the conference management platform will be communicated to you.

We would be honoured to have you join the ICETIA 2027 academic team and contribute to advancing research, innovation, and collaboration.

Kindly confirm your acceptance of this invitation by replying to this email. Upon acceptance, further information regarding your role and access to the conference management platform will be communicated to you.

Thank you for considering this invitation. We look forward to the possibility of working with you.

Warm regards,

ICETIA 2027 Organising Committee
International Conference on Emerging Technologies, Innovations & Applications
Federal University Otuoke, Bayelsa State, Nigeria
Email: conference@icetiaconference.org
Website: https://icetiaconference.org
`
}

export function reviewerInvite ({
  name,
  role
}: editorialInviteProps) {
  return `
  Dear ${name},
  

On behalf of the Organising Committee of the International Conference on Emerging Technologies, Innovations & Applications (ICETIA 2027), we are pleased to invite you to serve as a ${role} for the maiden edition of our conference.


On behalf of the Organising Committee of the International Conference on Emerging Technologies, Innovations & Applications (ICETIA 2027), we are pleased to invite you to serve as a ${role} for the maiden edition of our conference.

ICETIA 2027 will be held from 28th – 30th April 2027 at the Federal University Otuoke, Bayelsa State, Nigeria, with provisions for on-site and hybrid participation

Given your academic background, professional experience, and contributions to your field, we believe your expertise would be invaluable to the success of this conference.

Given your academic background, professional experience, and contributions to your field, we believe your expertise would be invaluable to the success of this conference.

As a ${role}, your responsibilities will include:

- Evaluating assigned manuscripts based on their originality, relevance, technical quality, and academic contributions.

- Providing constructive feedback and recommendations.

- Completing reviews within the stipulated deadlines

- Maintaining confidentiality and impartiality throughout the review process.

We would be honoured to have you join the ICETIA 2027 academic team and contribute to advancing research, innovation, and collaboration.

Kindly confirm your acceptance of this invitation by replying to this email. Upon acceptance, further information regarding your role and access to the conference management platform will be communicated to you.

Thank you for considering this invitation. We look forward to the possibility of working with you.

Warm regards,

ICETIA 2027 Organising Committee
International Conference on Emerging Technologies, Innovations & Applications
Federal University Otuoke, Bayelsa State, Nigeria
Email: conference@icetiaconference.org
Website: https://icetiaconference.org
`
}

export function editorialAcceptaance ({name, email, role}: editorialAcceptanceProps) {
  return `
  Dear ${name},

We are pleased to inform you that your ICETIA 2027 ${role} account has been successfully created and activated.

Thank you for accepting our invitation to join the academic team of the International Conference on Emerging Technologies, Innovations & Applications (ICETIA 2027).

You have been assigned the role of ${role} on the conference management platform. Through your account, you will be able to access the tools and resources required to carry out your assigned responsibilities.

Account Details

Name: ${name}

Email Address: ${email}

Assigned Role: ${role}

Conference: ICETIA 2027

Accessing Your Account

To access the conference management platform, please follow these steps:

Visit the ICETIA 2027 management portal: https://icetiaconference.org/admin

Sign in using your registered email address.

Complete the authentication process by entering the password sent to your email.

Once authenticated, you will be redirected to your designated dashboard.

Important Information

Keep your login credentials confidential.

Access to papers and conference information is restricted according to your assigned role.

All submitted manuscripts and review materials must be treated as confidential.

Please ensure that assigned tasks and deadlines are observed.

We sincerely appreciate your willingness to contribute your expertise to ICETIA 2027. Your participation is an important part of maintaining the academic quality and integrity of the conference.

Should you experience any difficulty accessing your account, please contact the conference support team.

We look forward to working with you.

Warm regards,

ICETIA 2027 Organising Committee
International Conference on Emerging Technologies, Innovations & Applications
Federal University Otuoke, Bayelsa State, Nigeria
Email: conference@icetiaconference.org
Website: https://icetiaconference.org
  `
}
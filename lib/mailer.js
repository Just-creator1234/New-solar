// lib/mailer.js

import nodemailer from "nodemailer";
import { generateContactEmail } from "@/components/generateContactEmail";

// Configure the mail transporter (Gmail SMTP example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

/**
 * Send a contact email to site admin
 * @param {Object} data - Contact form data
 * @returns {Promise<void>}
 */

export async function sendContactEmail(data) {
  const mailOptions = {
    from: `"Website Contact" <${process.env.SMTP_EMAIL}>`,
    to: process.env.RECEIVER_EMAIL || process.env.SMTP_EMAIL,
    subject: `New Contact Message: ${data.subject || "No Subject"}`,
    html: generateContactEmail(data),
  };

  await transporter.sendMail(mailOptions);
}

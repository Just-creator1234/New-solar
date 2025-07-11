"use server";

import prisma from "@/lib/prisma.js";
import { sendContactEmail } from "@/lib/mailer.js";

/**
 * Save contact form data to DB and send email
 * @param {Object} formData
 * @returns {Object}
 */
export async function saveContact(formData) {
  try {

    const saved = await prisma.contactMessage.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service || null,
        subject: formData.subject || null,
        message: formData.message,
      },
    });

    // Send email to admin
    await sendContactEmail(formData);

    return { success: true, data: saved };
  } catch (error) {
    console.error("Error saving or sending contact message:", error);
    return { success: false, error: "Something went wrong." };
  }
}

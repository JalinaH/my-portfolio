"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { validateContact } from "@/lib/validation";
import { allowRequest, requestIdentity } from "@/lib/rate-limit";
import { contactEmail } from "@/lib/portfolio";

export async function sendContactEmail(value: unknown) {
  let data;
  try { data = validateContact(value); }
  catch (error) { return { success: false, message: error instanceof Error ? error.message : "Invalid form." }; }
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) throw new Error("Email is not configured");
    if (!await allowRequest("contact", requestIdentity(headers()), 3, 600)) {
      return { success: false, message: "Too many messages. Please try again in 10 minutes." };
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: contactEmail,
      replyTo: data.email,
      subject: `Portfolio Contact: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
    });
    return { success: true, message: "Email sent successfully!" };
  } catch {
    console.error("Contact delivery failed");
    return { success: false, message: "Failed to send email. Please try again later." };
  }
}

"use server";

import { XMLParser } from "fast-xml-parser";
import nodemailer from "nodemailer";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  categories?: string[];
  thumbnail?: string;
}

// Define a type for the Medium RSS item
interface MediumRSSItem {
  title: string;
  link: string;
  pubDate: string;
  "content:encoded"?: string;
  category?: string | string[];
}

export async function getMediumPosts(username: string): Promise<MediumPost[]> {
  try {
    // Fetch the RSS feed from Medium
    const response = await fetch(`https://medium.com/feed/@${username}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium posts: ${response.status}`);
    }

    const xml = await response.text();

    // Parse the XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });

    const result = parser.parse(xml);
    const items = result.rss.channel.item;

    // Process the items
    return (Array.isArray(items) ? items : [items]).map((item: MediumRSSItem) => {
      // Extract the first image from the content if available
      let thumbnail = undefined;
      const imgMatch = item["content:encoded"]?.match(
        /<img[^>]+src="([^">]+)"/
      );
      if (imgMatch && imgMatch[1]) {
        thumbnail = imgMatch[1];
      }

      // Extract a clean excerpt from the content
      let content = item["content:encoded"] || "";
      content = content
        .replace(/<[^>]+>/g, "") // Remove HTML tags
        .substring(0, 150) // Limit to 150 characters
        .trim();

      if (content.length >= 150) {
        content += "...";
      }

      return {
        title: item.title,
        link: item.link,
        pubDate: new Date(item.pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        content,
        categories: item.category
          ? Array.isArray(item.category)
            ? item.category
            : [item.category]
          : [],
        thumbnail: thumbnail || "/placeholder.svg",
      };
    });
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "jalinahirushan2002@gmail.com", // Your receiving email
      subject: `Portfolio Contact: ${formData.subject}`,
      html: `
        <h3>New message from your portfolio contact form</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import ErrorHandler from "./ErrorHandler.js";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async (options: EmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        type: "OAuth2",
        user: process.env.SMTP_MAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });

    const { to, subject, html } = options;

    const mailOptions = {
      from: `"SkillStack" <${process.env.SMTP_MAIL}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    // 5. Detailed Error Log
    console.error("--- FINAL EMAIL FAILURE ---");
    console.error("Error Type:", error.code || "UNKNOWN");
    console.error("Error Message:", error.message);

    // Log the full error object for deep troubleshooting
    if (error.stack) {
      console.error("Error Stack Trace:", error.stack);
    }

    // The ETIMEDOUT error code is usually 'ESOCKET' or 'ETIMEDOUT'
    if (error.code === "ETIMEDOUT" || error.code === "ESOCKET") {
      console.error(
        "Diagnosis: The most likely cause is a **firewall** or **network block** on the outbound SMTP port (587 or 465)."
      );
    }
    throw new ErrorHandler(error.message, 500);
  }
};

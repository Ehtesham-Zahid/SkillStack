// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// import ErrorHandler from "./ErrorHandler.js";

// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
// }

// export const sendMail = async (options: EmailOptions) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: process.env.SMTP_SERVICE,
//       auth: {
//         type: "OAuth2",
//         user: process.env.SMTP_MAIL,
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//       },
//     });

//     const { to, subject, html } = options;

//     const mailOptions = {
//       from: `"SkillStack" <${process.env.SMTP_MAIL}>`,
//       to,
//       subject,
//       html,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error: any) {
//     // 5. Detailed Error Log
//     console.error("--- FINAL EMAIL FAILURE ---");
//     console.error("Error Type:", error.code || "UNKNOWN");
//     console.error("Error Message:", error.message);

//     // Log the full error object for deep troubleshooting
//     if (error.stack) {
//       console.error("Error Stack Trace:", error.stack);
//     }

//     // The ETIMEDOUT error code is usually 'ESOCKET' or 'ETIMEDOUT'
//     if (error.code === "ETIMEDOUT" || error.code === "ESOCKET") {
//       console.error(
//         "Diagnosis: The most likely cause is a **firewall** or **network block** on the outbound SMTP port (587 or 465)."
//       );
//     }
//     throw new ErrorHandler(error.message, 500);
//   }
// };

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import ErrorHandler from "./ErrorHandler.js";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  // Note: It's best practice to include 'text' for Brevo too!
}

export const sendMail = async (options: EmailOptions) => {
  // 1. Initial Configuration Check Log
  console.log("--- Starting Brevo Email Send Attempt ---");

  // Check for necessary Brevo variables
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PASS ||
    !process.env.SMTP_MAIL
  ) {
    const message =
      "Missing required Brevo/SMTP environment variables (HOST, PASS, or MAIL).";
    console.error("Configuration Error:", message);
    throw new ErrorHandler(message, 500);
  }

  try {
    // --- BREVO TRANSPORTER CONFIGURATION ---
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // false for port 587 (uses STARTTLS)
      logger: true,
      debug: true,
      auth: {
        // Use standard LOGIN type for Brevo API Key
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS, // This is your Brevo SMTP Key
      },
    });
    // ---------------------------------------

    const { to, subject, html } = options;

    const mailOptions = {
      // Ensure this 'from' email is verified in your Brevo account!
      from: `"SkillStack" <${process.env.SMTP_MAIL}>`,
      to,
      subject,
      html,
      // You may want to add 'text' here as a fallback
    };

    console.log(`Attempting to send mail to ${to} via Brevo...`);

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
  } catch (error: any) {
    // 5. Detailed Error Log (remains effective)
    console.error("--- FINAL EMAIL FAILURE ---");
    console.error("Error Type:", error.code || "UNKNOWN");
    console.error("Error Message:", error.message);

    if (error.stack) {
      console.error("Error Stack Trace:", error.stack);
    }

    // The ETIMEDOUT diagnosis is still relevant for network issues
    if (error.code === "ETIMEDOUT" || error.code === "ESOCKET") {
      console.error(
        "Diagnosis: The most likely cause is a **firewall** or **network block** on the outbound SMTP port (587 or 465)."
      );
    } else if (error.code === "EAUTH") {
      console.error(
        "Diagnosis: Authentication failed. Check if your **SMTP_PASS (Brevo Key)** is correct and the **SMTP_MAIL (Sender)** is verified in Brevo."
      );
    }
    throw new ErrorHandler(error.message, 500);
  }
};

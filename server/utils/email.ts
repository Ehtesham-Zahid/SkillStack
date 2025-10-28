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
import { google } from "googleapis";
dotenv.config();

import ErrorHandler from "./ErrorHandler.js";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRET as string,
  process.env.GOOGLE_REDIRECT_URI as string
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN as string,
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  // Note: It's best practice to include 'text' for Brevo too!
}

export const sendMail = async (options: EmailOptions) => {
  // 1. Initial Configuration Check Log
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_MAIL as string,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN as string,
      accessToken: accessToken as string,
    },
  });

  try {
    const { to, subject, html } = options;

    const mailOptions = {
      from: `"SkillStack" <${process.env.SMTP_MAIL}>`,
      to,
      subject,
      html,
    };

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

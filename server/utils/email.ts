// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import { google } from "googleapis";
// dotenv.config();

// import ErrorHandler from "./ErrorHandler.js";

// // ---------------------
// // OAUTH2 CONFIGURATION
// // ---------------------
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID as string,
//   process.env.GOOGLE_CLIENT_SECRET as string,
//   process.env.GOOGLE_REDIRECT_URI as string
// );

// oAuth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_REFRESH_TOKEN as string,
// });

// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
// }

// // ---------------------
// // SEND MAIL FUNCTION
// // ---------------------
// export const sendMail = async (options: EmailOptions) => {
//   console.log("========== EMAIL SERVICE START ==========");

//   // 1️⃣ Check for required ENV variables
//   const requiredEnv = [
//     "GOOGLE_CLIENT_ID",
//     "GOOGLE_CLIENT_SECRET",
//     "GOOGLE_REFRESH_TOKEN",
//     "GOOGLE_REDIRECT_URI",
//     "SMTP_MAIL",
//   ];
//   const missing = requiredEnv.filter((k) => !process.env[k]);
//   if (missing.length > 0) {
//     console.error("❌ Missing environment variables:", missing);
//     throw new ErrorHandler(
//       `Missing required env variables: ${missing.join(", ")}`,
//       500
//     );
//   }

//   console.log("✅ Environment variables loaded successfully");

//   // 2️⃣ Try generating access token
//   console.log("🔑 Requesting new access token from Google...");
//   let accessToken: string | undefined;
//   try {
//     const tokenResponse = await oAuth2Client.getAccessToken();
//     accessToken = tokenResponse?.token || undefined;

//     if (!accessToken) {
//       console.error(
//         "❌ Failed to obtain Google access token. Full response:",
//         tokenResponse
//       );
//       throw new Error("Access token is null or undefined.");
//     }

//     console.log(
//       "✅ Access token successfully retrieved (truncated):",
//       accessToken.slice(0, 20) + "..."
//     );
//   } catch (tokenError: any) {
//     console.error("❌ Error while fetching access token:");
//     console.error("Error Type:", tokenError.code || "UNKNOWN");
//     console.error("Error Message:", tokenError.message);
//     console.error("Full Error Object:", tokenError);
//     throw new ErrorHandler("Failed to obtain Google OAuth2 access token", 500);
//   }

//   // 3️⃣ Setup Nodemailer transporter
//   console.log("⚙️  Creating Nodemailer transporter with Gmail OAuth2...");
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.SMTP_MAIL as string,
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       refreshToken: process.env.GOOGLE_REFRESH_TOKEN as string,
//       accessToken,
//     },
//   });

//   try {
//     const { to, subject, html } = options;

//     console.log("📨 Preparing email...");
//     console.log("To:", to);
//     console.log("Subject:", subject);

//     const mailOptions = {
//       from: `"SkillStack" <${process.env.SMTP_MAIL}>`,
//       to,
//       subject,
//       html,
//     };

//     console.log("🚀 Sending email via Gmail SMTP...");
//     await transporter.sendMail(mailOptions);

//     console.log("✅ Email sent successfully!");
//     console.log("========== EMAIL SERVICE END ==========");
//   } catch (error: any) {
//     console.error("--- FINAL EMAIL FAILURE ---");
//     console.error("Error Type:", error.code || "UNKNOWN");
//     console.error("Error Message:", error.message);
//     if (error.response) console.error("SMTP Response:", error.response);
//     if (error.stack) console.error("Error Stack Trace:", error.stack);

//     // 🔍 Specific diagnostics
//     if (error.code === "ETIMEDOUT" || error.code === "ESOCKET") {
//       console.error(
//         "Diagnosis: Network or firewall blocking outbound SMTP (port 465 or 587)."
//       );
//     } else if (error.code === "EAUTH") {
//       console.error(
//         "Diagnosis: Gmail OAuth2 authentication failed. Verify CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, and ensure Gmail API is enabled."
//       );
//     } else if (error.message?.includes("invalid_client")) {
//       console.error(
//         "Diagnosis: Invalid Google OAuth2 client credentials. Ensure the redirect URI and credentials match your OAuth Playground setup."
//       );
//     }

//     console.error("========== EMAIL SERVICE FAILED ==========");
//     throw new ErrorHandler(error.message, 500);
//   }
// };

import nodemailer, { Transporter } from "nodemailer";
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
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
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

    console.log("✅ Email sent successfully!");
  } catch (error: any) {
    console.error("--- FINAL EMAIL FAILURE ---");
    console.error("Error Type:", error.code || "UNKNOWN");
    console.error("Error Message:", error.message);
    if (error.response) console.error("SMTP Response:", error.response);
    if (error.stack) console.error("Error Stack Trace:", error.stack);

    throw new ErrorHandler(error.message, 500);
  }
};

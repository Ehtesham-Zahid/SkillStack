import dotenv from "dotenv";
dotenv.config();
// import nodemailer, { Transporter } from "nodemailer";

import sgMail from "@sendgrid/mail";
import ErrorHandler from "./ErrorHandler.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async (options: EmailOptions) => {
  try {
    const { to, subject, html } = options;
    await sgMail.send({
      to,
      from: "ehteshamzahid313@gmail.com",
      subject,
      html,
    });
    // return response;
  } catch (error: any) {
    throw new ErrorHandler(error.message, 500);
  }
};

// const transporter: Transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: Number(process.env.SMTP_PORT) === 465, // SSL if 465
//   auth: {
//     user: process.env.SMTP_USER, // "apikey"
//     pass: process.env.SMTP_PASS, // actual SendGrid API key
//   },
// });

// const transporter: Transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST as string,
//   port: Number(process.env.SMTP_PORT),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER as string,
//     pass: process.env.SMTP_PASS as string,
//   },
// });

// export const sendMail = async (options: EmailOptions) => {
//   try {
//     const { to, subject, html } = options;
//     const info = await transporter.sendMail({
//       from: `"SkillStack" <ehteshamzahid313@gmail.com>`,
//       to,
//       subject,
//       html,
//     });
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

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
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
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
    throw new ErrorHandler(error.message, 500);
  }
};

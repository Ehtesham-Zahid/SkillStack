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
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });
    const { to, subject, html } = options;

    const mailOptions = {
      from: `"SkillStack" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.verify();
    console.log("✅ Gmail SMTP connection verified.");

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
  } catch (error: any) {
    throw new ErrorHandler(error.message, 500);
  }
};

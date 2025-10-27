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
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      secure: true,
      auth: {
        user: "ehteshamzahid313@gmail.com",
        pass: process.env.SMTP_PASS,
      },
    });

    const { to, subject, html } = options;

    const mailOptions = {
      from: `"SkillStack" <ehteshamzahid313@gmail.com>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    throw new ErrorHandler(error.message, 500);
  }
};

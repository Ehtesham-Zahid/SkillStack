import dotenv from "dotenv";
dotenv.config();
import nodemailer, { Transporter } from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  },
});

export const sendMail = async (options: EmailOptions) => {
  try {
    const { to, subject, html } = options;
    const info = await transporter.sendMail({
      from: `"SKILLSTACK" <ehteshamzahid313@gmail.com>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

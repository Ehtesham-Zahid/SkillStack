import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
export const sendMail = async (options) => {
    try {
        const { to, subject, html } = options;
        const info = await transporter.sendMail({
            from: `"SkillStack" <ehteshamzahid313@gmail.com>`,
            to,
            subject,
            html,
        });
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
};

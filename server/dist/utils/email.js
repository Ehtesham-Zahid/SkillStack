"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendMail = async (options) => {
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
exports.sendMail = sendMail;

import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";

import userModel from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler";
import { sendMail } from "../utils/email";

const __dirname = path.resolve();

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

interface IActivationRequest {
  activationToken: string;
  activationCode: string;
}

export const createActivationToken = (
  user: IRegistrationBody
): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

export const registrationUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist", 400));
    }

    const user: IRegistrationBody = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = {
      user: {
        name: user.name,
        email: user.email,
      },
      activationCode,
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "./mails/activation-mail.ejs"),
      data
    );

    await sendMail({
      to: user.email,
      subject: "Account Activation",
      html,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email ${user.email} to activate your account`,
      activationToken: activationToken.token,
    });
  }
);

// activate user

export const activateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activationToken, activationCode } = req.body;
  }
);

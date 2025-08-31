import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";

import userModel from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler";
import { sendMail } from "../utils/email";
import { sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getUserById } from "../services/userService";

const __dirname = path.resolve();

// create activation token
interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
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

// registration user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = asyncHandler(
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
interface IActivationRequest {
  activationToken: string;
  activationCode: string;
}

export const activateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activationToken, activationCode } = req.body as IActivationRequest;

    const newUser: { user: IRegistrationBody; activationCode: string } =
      jwt.verify(activationToken, process.env.ACTIVATION_SECRET as Secret) as {
        user: IRegistrationBody;
        activationCode: string;
      };

    if (newUser.activationCode !== activationCode) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, password } = newUser.user;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return next(new ErrorHandler("User already exist", 400));
    }

    const user = await userModel.create({ name, email, password });

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  }
);

// login user
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as ILoginRequest;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid credentials", 400));
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return next(new ErrorHandler("Invalid credentials", 400));
    }

    sendToken(user, 200, res);
  }
);

// logout user
export const logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("accessToken", "", { maxAge: 1 });
    res.cookie("refreshToken", "", { maxAge: 1 });
    redis.del(req.user?._id as string);
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  }
);

// update access token
export const updateAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken as string;

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret
    ) as JwtPayload;

    const message = "Could not refresh token";
    if (!decoded) {
      return next(new ErrorHandler(message, 400));
    }

    const session = await redis.get(decoded.id as string);
    if (!session) {
      return next(new ErrorHandler(message, 400));
    }

    const user = JSON.parse(session);

    sendToken(user, 200, res);
  }
);

// get user info
export const getUserInfo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    getUserById(userId as string, res);
  }
);

// social auth

interface ISocialAuthBody {
  email: string;
  name: string;
  avatar: string;
}

export const socialAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, avatar } = req.body as ISocialAuthBody;

    const user = await userModel.findOne({ email });

    if (!user) {
      const newUser = await userModel.create({ email, name, avatar });
      sendToken(newUser, 201, res);
    } else {
      sendToken(user, 200, res);
    }
  }
);

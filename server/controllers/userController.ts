import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

import userModel, { IUser } from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler";
import { ITokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import {
  activateUser,
  loginUser,
  registerUser,
  updateAccessToken,
} from "../services/userService";

// Register User
export const handleRegisterUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: `Please check your email ${data.email} to activate your account`,
      activationToken: data.token,
    });
  }
);

// activate user

export const handleActivateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await activateUser(req.body);

    res
      .status(201)
      .json({ success: true, message: "User activated successfully" });
  }
);

// login user
export const handleLoginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      accessToken,
      refreshToken,
      user,
      accessTokenOptions,
      refreshTokenOptions,
    } = (await loginUser(req.body)) as {
      accessToken: string;
      refreshToken: string;
      user: IUser;
      accessTokenOptions: ITokenOptions;
      refreshTokenOptions: ITokenOptions;
    };

    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);

    res.status(200).json({
      success: true,
      user,
      accessToken,
    });
  }
);

// logout user
export const handleLogoutUser = asyncHandler(
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
export const handleUpdateAccessToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshTokenIncoming = req.cookies.refreshToken as string;

    const {
      accessToken,
      user,
      refreshToken,
      accessTokenOptions,
      refreshTokenOptions,
    } = await updateAccessToken(refreshTokenIncoming);

    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    req.user = user;

    res.status(200).json({
      success: true,
      user,
      accessToken,
    });
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
      sendToken(newUser);
    } else {
      sendToken(user);
    }
  }
);

// update user info
interface IUpdateUserInfoBody {
  name: string;
  email: string;
}

export const updateUserInfo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body as IUpdateUserInfoBody;
    const userId = req.user?._id;
    const user = await userModel.findById(userId);

    if (email && user) {
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email already exist", 400));
      }
      user.email = email;
    }

    if (name && user) {
      user.name = name;
    }

    await user?.save();

    await redis.set(userId as string, JSON.stringify(user));

    res.status(200).json({ success: true, user });
  }
);

// update user password
interface IUpdatePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword } = req.body as IUpdatePasswordBody;
    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please enter old and new password", 400));
    }

    const userId = req.user?._id;
    const user = await userModel.findById(userId).select("+password");

    if (user?.password === undefined) {
      return next(new ErrorHandler("Initial login required", 404));
    }

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
      return next(new ErrorHandler("Invalid old password", 400));
    }

    user.password = newPassword;
    await user.save();

    await redis.set(userId as string, JSON.stringify(user));

    res.status(200).json({ success: true, user });
  }
);

// update profile picture
interface IUpdateProfilePictureBody {
  avatar: string;
}

export const updateProfilePicture = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { avatar } = req.body as IUpdateProfilePictureBody;
    const userId = req.user?._id;
    const user = await userModel.findById(userId);

    if (avatar && user) {
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } else {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    await user?.save();

    await redis.set(userId as string, JSON.stringify(user));

    res.status(200).json({ success: true, user });
  }
);

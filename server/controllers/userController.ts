import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

import { IUser } from "../models/userModel";
import { ITokenOptions } from "../utils/jwt";
import { redis } from "../utils/redis";
import {
  activateUser,
  loginUser,
  registerUser,
  updateAccessToken,
  updatePassword,
  updateUserInfo,
  updateProfilePicture,
  socialAuth,
  getAllUsers,
  updateUserRole,
  deleteUser,
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
    req.user = user as IUser;

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
    console.log("req.cookies", req.cookies);
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
    req.user = user as IUser;

    redis.set(user._id as string, JSON.stringify(user) as any, "EX", 604800); // 7days

    res.status(200).json({
      success: true,
      user,
      accessToken,
    });
  }
);

// get user info
export const handleGetUserInfo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, user: req.user });
  }
);

// social auth
export const handleSocialAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      accessToken,
      refreshToken,
      user,
      accessTokenOptions,
      refreshTokenOptions,
    } = (await socialAuth(req.body)) as {
      accessToken: string;
      refreshToken: string;
      user: IUser;
      accessTokenOptions: ITokenOptions;
      refreshTokenOptions: ITokenOptions;
    };

    res.cookie("accessToken", accessToken, accessTokenOptions);
    console.log("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    console.log("refreshToken", refreshToken);
    req.user = user as IUser;
    console.log("user", user);

    res.status(200).json({
      success: true,
      user,
      accessToken,
    });
  }
);

// update user info
export const handleUpdateUserInfo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (await updateUserInfo(
      req.body,
      req.user._id as string
    )) as IUser;
    res.status(200).json({ success: true, user });
  }
);

// update user password
export const handleUpdatePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const user = await updatePassword(req.body, userId as string);
    res.status(200).json({ success: true, user });
  }
);

// update profile picture
export const handleUpdateProfilePicture = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (await updateProfilePicture(
      req.body.avatar,
      req.user?._id as string
    )) as IUser;
    res.status(200).json({ success: true, user });
  }
);

// Get All Users --- Admin
export const handleGetAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await getAllUsers();
    res.status(200).json({ success: true, users });
  }
);

// Update User Role --- Admin
export const handleUpdateUserRole = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await updateUserRole(req.body);
    res.status(201).json({ success: true, user });
  }
);

// Delete User --- Admin
export const handleDeleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteUser(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  }
);

import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/userModel.js";
import { redis } from "./redis.js";
import ms from "ms";

export interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const sendToken = async (user: IUser) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  //   upload session to redis
  await redis.set(
    user._id as string,
    JSON.stringify(user) as any,
    "EX",
    604800
  ); // 7days

  //   options for cookies
  const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + ms(process.env.ACCESS_TOKEN_EXPIRE! as any)),
    maxAge: ms(process.env.ACCESS_TOKEN_EXPIRE! as any) as any,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };

  const refreshTokenOptions: ITokenOptions = {
    expires: new Date(
      Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRE! as any)
    ),
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE! as any) as any,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  };

  return {
    user: user as IUser,
    accessToken,
    accessTokenOptions,
    refreshToken,
    refreshTokenOptions,
  };
};

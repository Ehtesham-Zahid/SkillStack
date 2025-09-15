import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel, { IUser } from "../models/userModel";

// authenticate user
export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("isAuthenticated");
    console.log(req.cookies);
    const accessToken = req.cookies.accessToken as string;
    if (!accessToken) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;
    } catch {
      return next(new ErrorHandler("Invalid access token", 401));
    }

    const cached = await redis.get(decoded.id as string);

    let user: IUser | null;
    if (cached) {
      user = JSON.parse(cached) as IUser;
    } else {
      user = await UserModel.findById(decoded.id as string);
      if (user) {
        await redis.set(decoded.id as string, JSON.stringify(user));
      }
    }

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }
    console.log(user);
    req.user = user as IUser;
    next();
  }
);

// validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not authorized to access this resource`,
          403
        )
      );
    }
    next();
  };
};

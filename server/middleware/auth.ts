import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// authenticate user
export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken as string;
    if (!accessToken) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Invalid access token", 401));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    req.user = JSON.parse(user);
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

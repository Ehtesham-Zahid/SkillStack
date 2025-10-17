import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel";
// authenticate user
export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    let decoded;
    try {
        decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    }
    catch {
        return next(new ErrorHandler("Invalid access token", 401));
    }
    const cached = await redis.get(decoded.id);
    let user;
    if (cached) {
        user = JSON.parse(cached);
    }
    else {
        user = await UserModel.findById(decoded.id);
        if (user) {
            await redis.set(decoded.id, JSON.stringify(user));
        }
    }
    if (!user) {
        return next(new ErrorHandler("User not found", 401));
    }
    req.user = user;
    next();
});
// validate user role
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return next(new ErrorHandler(`Role: ${req.user?.role} is not authorized to access this resource`, 403));
        }
        next();
    };
};

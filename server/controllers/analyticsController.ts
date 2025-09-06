import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generateLast12MonthsData } from "../utils/analyticsGenerator";
import OrderModel from "../models/orderModel";
import UserModel from "../models/userModel";
import CourseModel from "../models/courseModel";

// Get Users Analytics --- Admin
export const handleUsersAnalytics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await generateLast12MonthsData(UserModel);
    res.status(200).json({ success: true, users });
  }
);

// Get Courses Analytics --- Admin
export const handleCoursesAnalytics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courses = await generateLast12MonthsData(CourseModel);
    res.status(200).json({ success: true, courses });
  }
);

// Get Orders Analytics --- Admin
export const handleOrdersAnalytics = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await generateLast12MonthsData(OrderModel);
    res.status(200).json({ success: true, orders });
  }
);

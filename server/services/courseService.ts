import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import CourseModel from "../models/courseModel";

// Create Course
export const createCourse = asyncHandler(
  async (data: any, res: Response, next: NextFunction) => {
    const course = await CourseModel.create(data);
    res.status(201).json({ success: true, course });
  }
);

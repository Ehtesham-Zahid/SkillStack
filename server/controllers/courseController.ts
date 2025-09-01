import { Request, Response, NextFunction } from "express";
import {
  createCourse,
  editCourse,
  getCourseById,
  getAllCourses,
} from "../services/courseService";
import asyncHandler from "express-async-handler";

// Create Course
export const handleCreateCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await createCourse(req.body);
    res.status(201).json({ success: true, course });
  }
);

// Edit Course
export const handleEditCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const courseId = req.params.id;

    const course = await editCourse(data, courseId);
    res.status(201).json({ success: true, course });
  }
);

// Get Single Course --- without purchasing
export const handleGetSingleCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await getCourseById(req.params.id);
    res.status(200).json({ success: true, course });
  }
);

// Get All Courses --- without purchasing
export const handleGetAllCourses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courses = await getAllCourses();
    res.status(200).json({ success: true, courses });
  }
);

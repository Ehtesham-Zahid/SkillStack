import { Request, Response, NextFunction } from "express";
import {
  createCourse,
  editCourse,
  getCourseById,
  getCourseByIdAdmin,
  getAllCourses,
  getCourseWithContent,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
  getAllCoursesAdmin,
  deleteCourse,
  generateVideoURL,
} from "../services/courseService.js";
import asyncHandler from "express-async-handler";
import { IUser } from "../models/userModel.js";

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
    const courseId = req.params.id as string;

    const course = await editCourse(data, courseId);
    res.status(201).json({ success: true, course });
  }
);

// Get Single Course --- without purchasing
export const handleGetSingleCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await getCourseById(req.params.id as string);
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

// Get Course Content -- only for valid users
export const handleGetCourseWithContent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await getCourseWithContent(
      req.user as IUser,
      req.params.id as string
    );
    res.status(200).json({ success: true, course });
  }
);

// Add Question to Course
export const handleAddQuestion = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await addQuestion(req.user as IUser, req.body as any);
    res.status(200).json({ success: true, course });
  }
);

export const handleAddAnswer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await addAnswer(req.user as IUser, req.body as any);
    res.status(200).json({ success: true, course });
  }
);

// Add Review to Course
export const handleAddReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await addReview(req.user as IUser, req.body as any);
    res.status(200).json({ success: true, course });
  }
);

// Add Reply to Review
export const handleAddReplyToReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await addReplyToReview(req.user as IUser, req.body as any);
    res.status(200).json({ success: true, course });
  }
);

// Get All Courses --- Admin
export const handleGetAllCoursesAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { courses, total } = await getAllCoursesAdmin(page, limit, skip);

    res.status(200).json({
      success: true,
      courses,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCourses: total,
    });
  }
);

// Delete Course --- Admin
export const handleDeleteCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteCourse(req.params.id as string);
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  }
);

// Get Single Course --- without purchasing
export const handleGetSingleCourseAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await getCourseByIdAdmin(req.params.id as string);
    res.status(200).json({ success: true, course });
  }
);

// Generate Video URL
export const handleGenerateVideoURL = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const videoURL = await generateVideoURL(req.body.videoId as string);
    res.status(200).json({ success: true, videoURL });
  }
);

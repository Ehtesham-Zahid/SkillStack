import { Request, Response, NextFunction } from "express";
import {
  createCourse,
  editCourse,
  getCourseById,
  getAllCourses,
  getCourseContent,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
  getAllCoursesAdmin,
  deleteCourse,
  generateVideoURL,
} from "../services/courseService";
import asyncHandler from "express-async-handler";
import { IUser } from "../models/userModel";

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

// Get Course Content -- only for valid users
export const handleGetCourseContent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const content = await getCourseContent(req.user as IUser, req.params.id);
    res.status(200).json({ success: true, content });
  }
);

// Add Question to Course
export const handleAddQuestion = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await addQuestion(req.user as IUser, req.body);
    res.status(200).json({ success: true, course });
  }
);

export const handleAddAnswer = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await addAnswer(req.user as IUser, req.body);
    res.status(200).json({ success: true, course });
  }
);

// Add Review to Course
export const handleAddReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await addReview(req.user as IUser, req.body, req.params.id);
    res.status(200).json({ success: true, course });
  }
);

// --------------EVERYTHING SOLID TILL NOW----------------

// Add Reply to Review
export const handleAddReplyToReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await addReplyToReview(req.user as IUser, req.body);
    res.status(200).json({ success: true, course });
  }
);

// Get All Courses --- Admin
export const handleGetAllCoursesAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courses = await getAllCoursesAdmin();
    res.status(200).json({ success: true, courses });
  }
);

// Delete Course --- Admin
export const handleDeleteCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await deleteCourse(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  }
);

// Generate Video URL
export const handleGenerateVideoURL = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const videoURL = await generateVideoURL(req.body.videoId);
    res.status(200).json({ success: true, videoURL });
  }
);

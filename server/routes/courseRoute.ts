import express, { Router } from "express";
import {
  handleAddQuestion,
  handleAddAnswer,
  handleAddReview,
  handleCreateCourse,
  handleEditCourse,
  handleGetAllCourses,
  handleGetCourseContent,
  handleGetSingleCourse,
  handleAddReplyToReview,
  handleGetAllCoursesAdmin,
  handleDeleteCourse,
} from "../controllers/courseController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const courseRouter: Router = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  handleCreateCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  handleEditCourse
);

courseRouter.get("/get-course/:id", handleGetSingleCourse);

courseRouter.get("/get-all-courses", handleGetAllCourses);

courseRouter.get(
  "/get-course-content/:id",
  isAuthenticated,
  handleGetCourseContent
);

courseRouter.put("/add-question", isAuthenticated, handleAddQuestion);

courseRouter.put("/add-answer", isAuthenticated, handleAddAnswer);

courseRouter.put("/add-review/:id", isAuthenticated, handleAddReview);

courseRouter.put(
  "/add-reply-to-review",
  isAuthenticated,
  authorizeRoles("admin"),
  handleAddReplyToReview
);

courseRouter.get(
  "/get-all-courses-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  handleGetAllCoursesAdmin
);

courseRouter.delete(
  "/delete-course-admin/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  handleDeleteCourse
);

export default courseRouter;

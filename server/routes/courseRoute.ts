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
  handleGenerateVideoURL,
} from "../controllers/courseController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { handleUpdateAccessToken } from "../controllers/userController";

const courseRouter: Router = express.Router();

courseRouter.post(
  "/create-course",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleCreateCourse
);

courseRouter.put(
  "/edit-course/:id",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleEditCourse
);

courseRouter.get("/get-course/:id", handleGetSingleCourse);

courseRouter.get("/get-all-courses", handleGetAllCourses);

courseRouter.get(
  "/get-course-content/:id",
  handleUpdateAccessToken,
  isAuthenticated,
  handleGetCourseContent
);

courseRouter.put(
  "/add-question",
  handleUpdateAccessToken,
  isAuthenticated,
  handleAddQuestion
);

courseRouter.put(
  "/add-answer",
  handleUpdateAccessToken,
  isAuthenticated,
  handleAddAnswer
);

courseRouter.put(
  "/add-review/:id",
  handleUpdateAccessToken,
  isAuthenticated,
  handleAddReview
);

courseRouter.put(
  "/add-reply-to-review",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleAddReplyToReview
);

courseRouter.get(
  "/get-all-courses-admin",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleGetAllCoursesAdmin
);

courseRouter.post("/getVdoCipherOTP", handleGenerateVideoURL);

courseRouter.delete(
  "/delete-course-admin/:id",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleDeleteCourse
);

export default courseRouter;

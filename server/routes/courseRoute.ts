import express, { Router } from "express";
import {
  handleCreateCourse,
  handleEditCourse,
  handleGetAllCourses,
  handleGetSingleCourse,
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

export default courseRouter;

import express, { Router } from "express";
import { handleCreateCourse } from "../controllers/courseController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const courseRouter: Router = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  handleCreateCourse
);

export default courseRouter;

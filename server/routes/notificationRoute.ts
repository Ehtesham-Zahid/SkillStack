import express from "express";
import {
  handleGetAllNotifications,
  handleUpdateNotificationStatus,
} from "../controllers/notificationController.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.js";
import { handleUpdateAccessToken } from "../controllers/userController.js";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleGetAllNotifications
);

notificationRouter.put(
  "/update-notification-status/:id",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleUpdateNotificationStatus
);

export default notificationRouter;

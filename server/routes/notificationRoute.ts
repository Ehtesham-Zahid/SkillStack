import express from "express";
import {
  handleGetAllNotifications,
  handleUpdateNotificationStatus,
} from "../controllers/notificationController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { handleUpdateAccessToken } from "../controllers/userController";

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

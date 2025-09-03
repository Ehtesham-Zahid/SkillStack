import express from "express";
import {
  handleGetAllNotifications,
  handleUpdateNotificationStatus,
} from "../controllers/notificationController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  handleGetAllNotifications
);

notificationRouter.put(
  "/update-notification-status/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  handleUpdateNotificationStatus
);

export default notificationRouter;

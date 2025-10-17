import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  getAllNotifications,
  updateNotificationStatus,
  deleteNotifications,
} from "../services/notificationService.js";
import cron from "node-cron";

export const handleGetAllNotifications = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const notifications = await getAllNotifications();
    res.status(200).json({ success: true, notifications: notifications });
  }
);

// Update Notification Status
export const handleUpdateNotificationStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const notifications = await updateNotificationStatus(
      req.params.id as string
    );
    res.status(200).json({ success: true, notifications: notifications });
  }
);

// Delete Notifications - Cron Job
cron.schedule("0 0 * * *", async () => {
  await deleteNotifications();
});

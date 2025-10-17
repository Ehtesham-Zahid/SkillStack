import NotificationModel from "../models/notificationModel.js";

// Get All Notifications
export const getAllNotifications = async () => {
  const notifications = await NotificationModel.find().sort({ createdAt: -1 });
  return notifications;
};

// Update Notification Status
export const updateNotificationStatus = async (id: string) => {
  const notification = await NotificationModel.findById(id);
  if (!notification) {
    throw new Error("Notification not found");
  }

  notification.status = "read";

  await notification.save();

  const notifications = await NotificationModel.find().sort({ createdAt: -1 });
  return notifications;
};

// Delete Notifications - Cron Job
export const deleteNotifications = async () => {
  await NotificationModel.deleteMany({
    status: "unread",
    createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
  });
};

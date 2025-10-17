"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotifications = exports.updateNotificationStatus = exports.getAllNotifications = void 0;
const notificationModel_js_1 = __importDefault(require("../models/notificationModel.js"));
// Get All Notifications
const getAllNotifications = async () => {
    const notifications = await notificationModel_js_1.default.find().sort({ createdAt: -1 });
    return notifications;
};
exports.getAllNotifications = getAllNotifications;
// Update Notification Status
const updateNotificationStatus = async (id) => {
    const notification = await notificationModel_js_1.default.findById(id);
    if (!notification) {
        throw new Error("Notification not found");
    }
    notification.status = "read";
    await notification.save();
    const notifications = await notificationModel_js_1.default.find().sort({ createdAt: -1 });
    return notifications;
};
exports.updateNotificationStatus = updateNotificationStatus;
// Delete Notifications - Cron Job
const deleteNotifications = async () => {
    await notificationModel_js_1.default.deleteMany({
        status: "unread",
        createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });
};
exports.deleteNotifications = deleteNotifications;

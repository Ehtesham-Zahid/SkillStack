"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdateNotificationStatus = exports.handleGetAllNotifications = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notificationService_1 = require("../services/notificationService");
const node_cron_1 = __importDefault(require("node-cron"));
exports.handleGetAllNotifications = (0, express_async_handler_1.default)(async (req, res, next) => {
    const notifications = await (0, notificationService_1.getAllNotifications)();
    res.status(200).json({ success: true, notifications: notifications });
});
// Update Notification Status
exports.handleUpdateNotificationStatus = (0, express_async_handler_1.default)(async (req, res, next) => {
    const notifications = await (0, notificationService_1.updateNotificationStatus)(req.params.id);
    res.status(200).json({ success: true, notifications: notifications });
});
// Delete Notifications - Cron Job
node_cron_1.default.schedule("0 0 * * *", async () => {
    await (0, notificationService_1.deleteNotifications)();
});

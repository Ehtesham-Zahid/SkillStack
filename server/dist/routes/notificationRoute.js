"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationController_js_1 = require("../controllers/notificationController.js");
const auth_js_1 = require("../middleware/auth.js");
const userController_js_1 = require("../controllers/userController.js");
const notificationRouter = express_1.default.Router();
notificationRouter.get("/get-all-notifications", userController_js_1.handleUpdateAccessToken, auth_js_1.isAuthenticated, (0, auth_js_1.authorizeRoles)("admin"), notificationController_js_1.handleGetAllNotifications);
notificationRouter.put("/update-notification-status/:id", userController_js_1.handleUpdateAccessToken, auth_js_1.isAuthenticated, (0, auth_js_1.authorizeRoles)("admin"), notificationController_js_1.handleUpdateNotificationStatus);
exports.default = notificationRouter;

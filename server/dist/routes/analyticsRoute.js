"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsController_js_1 = require("../controllers/analyticsController.js");
const auth_js_1 = require("../middleware/auth.js");
const userController_js_1 = require("../controllers/userController.js");
const analyticsRouter = express_1.default.Router();
analyticsRouter.get("/get-users-analytics", userController_js_1.handleUpdateAccessToken, auth_js_1.isAuthenticated, (0, auth_js_1.authorizeRoles)("admin"), analyticsController_js_1.handleUsersAnalytics);
analyticsRouter.get("/get-courses-analytics", userController_js_1.handleUpdateAccessToken, auth_js_1.isAuthenticated, (0, auth_js_1.authorizeRoles)("admin"), analyticsController_js_1.handleCoursesAnalytics);
analyticsRouter.get("/get-orders-analytics", userController_js_1.handleUpdateAccessToken, auth_js_1.isAuthenticated, (0, auth_js_1.authorizeRoles)("admin"), analyticsController_js_1.handleOrdersAnalytics);
exports.default = analyticsRouter;

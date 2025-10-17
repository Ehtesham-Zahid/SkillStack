import express from "express";
import { handleUsersAnalytics, handleCoursesAnalytics, handleOrdersAnalytics, } from "../controllers/analyticsController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { handleUpdateAccessToken } from "../controllers/userController";
const analyticsRouter = express.Router();
analyticsRouter.get("/get-users-analytics", handleUpdateAccessToken, isAuthenticated, authorizeRoles("admin"), handleUsersAnalytics);
analyticsRouter.get("/get-courses-analytics", handleUpdateAccessToken, isAuthenticated, authorizeRoles("admin"), handleCoursesAnalytics);
analyticsRouter.get("/get-orders-analytics", handleUpdateAccessToken, isAuthenticated, authorizeRoles("admin"), handleOrdersAnalytics);
export default analyticsRouter;

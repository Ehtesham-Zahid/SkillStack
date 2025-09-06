import express from "express";
import {
  handleCreateOrder,
  handleGetAllOrdersAdmin,
} from "../controllers/orderController";
import { isAuthenticated, authorizeRoles } from "../middleware/auth";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, handleCreateOrder);

orderRouter.get(
  "/get-all-orders-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  handleGetAllOrdersAdmin
);

export default orderRouter;

import express from "express";
import {
  handleCreateOrder,
  handleGetAllOrdersAdmin,
  handleNewPayment,
  handleSendStripePublishableKey,
} from "../controllers/orderController.js";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.js";
import { handleUpdateAccessToken } from "../controllers/userController.js";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, handleCreateOrder);

orderRouter.get(
  "/get-all-orders-admin",
  handleUpdateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  handleGetAllOrdersAdmin
);

orderRouter.get("/get-stripe-publishable-key", handleSendStripePublishableKey);

orderRouter.post("/new-payment", isAuthenticated, handleNewPayment);

export default orderRouter;

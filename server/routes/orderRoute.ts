import express from "express";
import { handleCreateOrder } from "../controllers/orderController";
import { isAuthenticated } from "../middleware/auth";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, handleCreateOrder);

export default orderRouter;

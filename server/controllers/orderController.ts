import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { createOrder, getAllOrdersAdmin } from "../services/orderService";

// Create Order
export const handleCreateOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await createOrder(req.body, req.user?._id as string);
    res.status(201).json({ success: true, course: order });
  }
);

// Get All Orders --- Admin
export const handleGetAllOrdersAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const { orders, total } = await getAllOrdersAdmin(page, limit, skip);
    res.status(200).json({
      success: true,
      orders,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalOrders: total,
    });
  }
);

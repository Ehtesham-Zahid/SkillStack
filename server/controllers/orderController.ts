import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { createOrder } from "../services/orderService";

// Create Order
export const handleCreateOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await createOrder(req.body, req.user?._id as string);
    res.status(201).json({ success: true, course: order });
  }
);

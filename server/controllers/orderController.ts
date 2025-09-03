import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { createOrder } from "../services/orderService";
import { IUser } from "../models/userModel";

// Create Order
export const handleCreateOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await createOrder(req.body, req.user as IUser);
    res.status(201).json({ success: true, course: order });
  }
);

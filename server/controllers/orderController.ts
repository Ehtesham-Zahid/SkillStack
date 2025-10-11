import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createOrder, getAllOrdersAdmin } from "../services/orderService";
import dotenv from "dotenv";
dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import stripe from "stripe";

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

export const handleSendStripePublishableKey = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    res.status(200).json({ success: true, key: stripePublishableKey });
  }
);

export const handleNewPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const mypayment = await stripe(
      process.env.STRIPE_SECRET_KEY
    ).paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "Skill Stack",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res
      .status(201)
      .json({ success: true, client_secret: mypayment.client_secret });
  }
);

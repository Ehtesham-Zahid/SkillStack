import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../services/layoutService";

// Create Layout
export const handleCreateLayout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await createLayout(req.body);
    res
      .status(201)
      .json({ success: true, message: "Layout created successfully" });
  }
);

// Edit Layout
export const handleEditLayout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.body", req.body);
    const layout = await editLayout(req.body);
    res
      .status(200)
      .json({ success: true, message: "Layout edited successfully", layout });
  }
);

// Get Layout By Type
export const handleGetLayoutByType = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const type = req.query.type as string;
    const layout = await getLayoutByType(type);
    res
      .status(200)
      .json({ success: true, layout, message: "Layout fetched successfully" });
  }
);

import asyncHandler from "express-async-handler";
import { createLayout, editLayout, getLayoutByType, } from "../services/layoutService";
// Create Layout
export const handleCreateLayout = asyncHandler(async (req, res, next) => {
    await createLayout(req.body);
    res
        .status(201)
        .json({ success: true, message: "Layout created successfully" });
});
// Edit Layout
export const handleEditLayout = asyncHandler(async (req, res, next) => {
    const layout = await editLayout(req.body);
    res
        .status(200)
        .json({ success: true, message: "Layout edited successfully", layout });
});
// Get Layout By Type
export const handleGetLayoutByType = asyncHandler(async (req, res, next) => {
    const type = req.query.type;
    const layout = await getLayoutByType(type);
    res
        .status(200)
        .json({ success: true, layout, message: "Layout fetched successfully" });
});

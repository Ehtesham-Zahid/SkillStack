"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetLayoutByType = exports.handleEditLayout = exports.handleCreateLayout = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const layoutService_1 = require("../services/layoutService");
// Create Layout
exports.handleCreateLayout = (0, express_async_handler_1.default)(async (req, res, next) => {
    await (0, layoutService_1.createLayout)(req.body);
    res
        .status(201)
        .json({ success: true, message: "Layout created successfully" });
});
// Edit Layout
exports.handleEditLayout = (0, express_async_handler_1.default)(async (req, res, next) => {
    const layout = await (0, layoutService_1.editLayout)(req.body);
    res
        .status(200)
        .json({ success: true, message: "Layout edited successfully", layout });
});
// Get Layout By Type
exports.handleGetLayoutByType = (0, express_async_handler_1.default)(async (req, res, next) => {
    const type = req.query.type;
    const layout = await (0, layoutService_1.getLayoutByType)(type);
    res
        .status(200)
        .json({ success: true, layout, message: "Layout fetched successfully" });
});

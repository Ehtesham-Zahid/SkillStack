"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOrdersAnalytics = exports.handleCoursesAnalytics = exports.handleUsersAnalytics = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const analyticsGenerator_js_1 = require("../utils/analyticsGenerator.js");
const orderModel_js_1 = __importDefault(require("../models/orderModel.js"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const courseModel_js_1 = __importDefault(require("../models/courseModel.js"));
// Get Users Analytics --- Admin
exports.handleUsersAnalytics = (0, express_async_handler_1.default)(async (req, res, next) => {
    const users = await (0, analyticsGenerator_js_1.generateLast12MonthsData)(userModel_js_1.default);
    res.status(200).json({ success: true, users });
});
// Get Courses Analytics --- Admin
exports.handleCoursesAnalytics = (0, express_async_handler_1.default)(async (req, res, next) => {
    const courses = await (0, analyticsGenerator_js_1.generateLast12MonthsData)(courseModel_js_1.default);
    res.status(200).json({ success: true, courses });
});
// Get Orders Analytics --- Admin
exports.handleOrdersAnalytics = (0, express_async_handler_1.default)(async (req, res, next) => {
    const orders = await (0, analyticsGenerator_js_1.generateLast12MonthsData)(orderModel_js_1.default);
    res.status(200).json({ success: true, orders });
});

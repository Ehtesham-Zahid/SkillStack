"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayoutByType = exports.editLayout = exports.createLayout = void 0;
const layoutModel_js_1 = __importDefault(require("../models/layoutModel.js"));
const ErrorHandler_js_1 = __importDefault(require("../utils/ErrorHandler.js"));
const redis_js_1 = require("../utils/redis.js");
// Create Layout
const createLayout = async (data) => {
    const { type } = data;
    const isTypeExist = await layoutModel_js_1.default.findOne({ type });
    if (isTypeExist)
        throw new ErrorHandler_js_1.default(`${type} already exists`, 400);
    let layoutData = {};
    if (type === "Banner") {
        layoutData = { banner: { title: data.title, subtitle: data.subtitle } };
    }
    else if (type === "Faqs") {
        layoutData = {
            faq: data.faq.map((item) => ({
                question: item.question,
                answer: item.answer,
            })),
        };
    }
    else if (type === "Categories") {
        layoutData = {
            categories: data.categories.map((item) => ({ title: item.title })),
        };
    }
    const layout = await layoutModel_js_1.default.create({ type, ...layoutData });
    await redis_js_1.redis.set(type, JSON.stringify(layout), "EX", 604800); // 7 days cache
    return layout;
};
exports.createLayout = createLayout;
// Edit Layout
const editLayout = async (data) => {
    const { type } = data;
    const layout = await layoutModel_js_1.default.findOne({ type });
    if (!layout)
        throw new ErrorHandler_js_1.default(`${type} layout not found`, 404);
    let updatedFields = {};
    if (type === "Banner") {
        updatedFields = {
            "banner.title": data.title,
            "banner.subtitle": data.subtitle,
        };
    }
    else if (type === "Faqs") {
        updatedFields = {
            faq: data.faq.map((item) => ({
                question: item.question,
                answer: item.answer,
            })),
        };
    }
    else if (type === "Categories") {
        updatedFields = {
            categories: data.categories.map((item) => ({ title: item.title })),
        };
    }
    const updatedLayout = await layoutModel_js_1.default.findByIdAndUpdate(layout._id, { $set: updatedFields }, { new: true });
    // Refresh cache
    await redis_js_1.redis.del(type);
    await redis_js_1.redis.set(type, JSON.stringify(updatedLayout), "EX", 604800);
    return updatedLayout;
};
exports.editLayout = editLayout;
// Get Layout by Type
const getLayoutByType = async (type) => {
    const cached = await redis_js_1.redis.get(type);
    if (cached)
        return JSON.parse(cached);
    const layout = await layoutModel_js_1.default.findOne({ type });
    if (layout)
        await redis_js_1.redis.set(type, JSON.stringify(layout), "EX", 604800);
    return layout;
};
exports.getLayoutByType = getLayoutByType;

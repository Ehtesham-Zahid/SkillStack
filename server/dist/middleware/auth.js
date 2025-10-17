"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.isAuthenticated = void 0;
const ErrorHandler_js_1 = __importDefault(require("../utils/ErrorHandler.js"));
const redis_js_1 = require("../utils/redis.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
// authenticate user
exports.isAuthenticated = (0, express_async_handler_1.default)(async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return next(new ErrorHandler_js_1.default("Please login to access this resource", 401));
    }
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    }
    catch {
        return next(new ErrorHandler_js_1.default("Invalid access token", 401));
    }
    const cached = await redis_js_1.redis.get(decoded.id);
    let user;
    if (cached) {
        user = JSON.parse(cached);
    }
    else {
        user = await userModel_js_1.default.findById(decoded.id);
        if (user) {
            await redis_js_1.redis.set(decoded.id, JSON.stringify(user));
        }
    }
    if (!user) {
        return next(new ErrorHandler_js_1.default("User not found", 401));
    }
    req.user = user;
    next();
});
// validate user role
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            return next(new ErrorHandler_js_1.default(`Role: ${req.user?.role} is not authorized to access this resource`, 403));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;

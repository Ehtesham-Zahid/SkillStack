"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteUser = exports.handleUpdateUserRole = exports.handleGetAllUsers = exports.handleUpdateProfilePicture = exports.handleUpdatePassword = exports.handleUpdateUserInfo = exports.handleSocialAuth = exports.handleGetUserInfo = exports.handleUpdateAccessToken = exports.handleLogoutUser = exports.handleLoginUser = exports.handleActivateUser = exports.handleRegisterUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis_js_1 = require("../utils/redis.js");
const userService_js_1 = require("../services/userService.js");
// Register User
exports.handleRegisterUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const data = await (0, userService_js_1.registerUser)(req.body);
    res.status(201).json({
        success: true,
        message: `Please check your email ${data.email} to activate your account`,
        activationToken: data.token,
    });
});
// activate user
exports.handleActivateUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    await (0, userService_js_1.activateUser)(req.body);
    res
        .status(201)
        .json({ success: true, message: "User activated successfully" });
});
// login user
exports.handleLoginUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { accessToken, refreshToken, user, accessTokenOptions, refreshTokenOptions, } = (await (0, userService_js_1.loginUser)(req.body));
    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    req.user = user;
    res.status(200).json({
        success: true,
        user,
        accessToken,
    });
});
// logout user
exports.handleLogoutUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    res.cookie("accessToken", "", { maxAge: 1 });
    res.cookie("refreshToken", "", { maxAge: 1 });
    redis_js_1.redis.del(req.user?._id);
    res
        .status(200)
        .json({ success: true, message: "User logged out successfully" });
});
// update access token
exports.handleUpdateAccessToken = (0, express_async_handler_1.default)(async (req, res, next) => {
    const refreshTokenIncoming = req.cookies.refreshToken;
    const { accessToken, user, refreshToken, accessTokenOptions, refreshTokenOptions, } = await (0, userService_js_1.updateAccessToken)(refreshTokenIncoming);
    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    req.user = user;
    req.cookies.accessToken = accessToken;
    req.cookies.refreshToken = refreshToken;
    redis_js_1.redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    next();
});
// get user info
exports.handleGetUserInfo = (0, express_async_handler_1.default)(async (req, res, next) => {
    res.status(200).json({ success: true, user: req.user });
});
// social auth
exports.handleSocialAuth = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { accessToken, refreshToken, user, accessTokenOptions, refreshTokenOptions, } = (await (0, userService_js_1.socialAuth)(req.body));
    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    req.user = user;
    res.status(200).json({
        success: true,
        user,
        accessToken,
    });
});
// update user info
exports.handleUpdateUserInfo = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user = (await (0, userService_js_1.updateUserInfo)(req.body, req.user?._id));
    res.status(200).json({ success: true, user });
});
// update user password
exports.handleUpdatePassword = (0, express_async_handler_1.default)(async (req, res, next) => {
    const userId = req.user?._id;
    const user = await (0, userService_js_1.updatePassword)(req.body, userId);
    res.status(200).json({ success: true, user });
});
// update profile picture
exports.handleUpdateProfilePicture = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user = (await (0, userService_js_1.updateProfilePicture)(req.body.avatar, req.user?._id));
    res.status(200).json({ success: true, user });
});
// Get All Users --- Admin
exports.handleGetAllUsers = (0, express_async_handler_1.default)(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const role = req.query.role;
    const { users, total } = await (0, userService_js_1.getAllUsers)(page, limit, skip, role);
    res.status(200).json({
        success: true,
        users,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
    });
});
// Update User Role --- Admin
exports.handleUpdateUserRole = (0, express_async_handler_1.default)(async (req, res, next) => {
    const user = await (0, userService_js_1.updateUserRole)(req.body);
    res.status(201).json({ success: true, user });
});
// Delete User --- Admin
exports.handleDeleteUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    await (0, userService_js_1.deleteUser)(req.params.id);
    res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
});

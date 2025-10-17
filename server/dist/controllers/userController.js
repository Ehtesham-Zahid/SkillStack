import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();
import { redis } from "../utils/redis";
import { activateUser, loginUser, registerUser, updateAccessToken, updatePassword, updateUserInfo, updateProfilePicture, socialAuth, getAllUsers, updateUserRole, deleteUser, } from "../services/userService";
// Register User
export const handleRegisterUser = asyncHandler(async (req, res, next) => {
    const data = await registerUser(req.body);
    res.status(201).json({
        success: true,
        message: `Please check your email ${data.email} to activate your account`,
        activationToken: data.token,
    });
});
// activate user
export const handleActivateUser = asyncHandler(async (req, res, next) => {
    await activateUser(req.body);
    res
        .status(201)
        .json({ success: true, message: "User activated successfully" });
});
// login user
export const handleLoginUser = asyncHandler(async (req, res, next) => {
    const { accessToken, refreshToken, user, accessTokenOptions, refreshTokenOptions, } = (await loginUser(req.body));
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
export const handleLogoutUser = asyncHandler(async (req, res, next) => {
    res.cookie("accessToken", "", { maxAge: 1 });
    res.cookie("refreshToken", "", { maxAge: 1 });
    redis.del(req.user?._id);
    res
        .status(200)
        .json({ success: true, message: "User logged out successfully" });
});
// update access token
export const handleUpdateAccessToken = asyncHandler(async (req, res, next) => {
    const refreshTokenIncoming = req.cookies.refreshToken;
    const { accessToken, user, refreshToken, accessTokenOptions, refreshTokenOptions, } = await updateAccessToken(refreshTokenIncoming);
    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    req.user = user;
    req.cookies.accessToken = accessToken;
    req.cookies.refreshToken = refreshToken;
    redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    next();
});
// get user info
export const handleGetUserInfo = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, user: req.user });
});
// social auth
export const handleSocialAuth = asyncHandler(async (req, res, next) => {
    const { accessToken, refreshToken, user, accessTokenOptions, refreshTokenOptions, } = (await socialAuth(req.body));
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
export const handleUpdateUserInfo = asyncHandler(async (req, res, next) => {
    const user = (await updateUserInfo(req.body, req.user._id));
    res.status(200).json({ success: true, user });
});
// update user password
export const handleUpdatePassword = asyncHandler(async (req, res, next) => {
    const userId = req.user?._id;
    const user = await updatePassword(req.body, userId);
    res.status(200).json({ success: true, user });
});
// update profile picture
export const handleUpdateProfilePicture = asyncHandler(async (req, res, next) => {
    const user = (await updateProfilePicture(req.body.avatar, req.user?._id));
    res.status(200).json({ success: true, user });
});
// Get All Users --- Admin
export const handleGetAllUsers = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const role = req.query.role;
    const { users, total } = await getAllUsers(page, limit, skip, role);
    res.status(200).json({
        success: true,
        users,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
    });
});
// Update User Role --- Admin
export const handleUpdateUserRole = asyncHandler(async (req, res, next) => {
    const user = await updateUserRole(req.body);
    res.status(201).json({ success: true, user });
});
// Delete User --- Admin
export const handleDeleteUser = asyncHandler(async (req, res, next) => {
    await deleteUser(req.params.id);
    res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
});

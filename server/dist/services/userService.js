"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllUsers = exports.socialAuth = exports.updateProfilePicture = exports.updateUserInfo = exports.updatePassword = exports.updateAccessToken = exports.loginUser = exports.activateUser = exports.registerUser = void 0;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = __importDefault(require("cloudinary"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const redis_js_1 = require("../utils/redis.js");
const email_js_1 = require("../utils/email.js");
const jwt_js_1 = require("../utils/jwt.js");
const ErrorHandler_js_1 = __importDefault(require("../utils/ErrorHandler.js"));
const __dirname = path_1.default.resolve();
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({
        user,
        activationCode,
    }, process.env.ACTIVATION_SECRET, {
        expiresIn: "10m",
    });
    return { token, activationCode };
};
// registration user
const registerUser = async (userData) => {
    const { name, email } = userData;
    const isEmailExist = (await userModel_js_1.default.findOne({ email }));
    if (isEmailExist &&
        (isEmailExist.provider === "google" || isEmailExist.provider === "github")) {
        throw new ErrorHandler_js_1.default(`User already exist with ${isEmailExist.provider} provider`, 400);
    }
    else if (isEmailExist) {
        throw new ErrorHandler_js_1.default("Email already exist", 400);
    }
    const activationToken = createActivationToken(userData);
    const activationCode = activationToken.activationCode;
    const mailData = {
        user: {
            name,
            email,
        },
        activationCode,
    };
    const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "./mails/activation-mail.ejs"), mailData);
    await (0, email_js_1.sendMail)({
        to: email,
        subject: "Account Activation",
        html,
    });
    return {
        token: activationToken.token,
        email,
    };
};
exports.registerUser = registerUser;
const activateUser = async (activationData) => {
    const { activationToken, activationCode } = activationData;
    const newUser = jsonwebtoken_1.default.verify(activationToken, process.env.ACTIVATION_SECRET);
    if (!newUser) {
        throw new ErrorHandler_js_1.default("Invalid activation token", 400);
    }
    if (newUser.activationCode !== activationCode) {
        throw new ErrorHandler_js_1.default("Invalid activation code", 400);
    }
    const { name, email, password } = newUser.user;
    const userExist = (await userModel_js_1.default.findOne({ email }));
    if (userExist) {
        throw new ErrorHandler_js_1.default("User already exist", 400);
    }
    (await userModel_js_1.default.create({ name, email, password }));
};
exports.activateUser = activateUser;
const loginUser = async (loginData) => {
    const { email, password } = loginData;
    if (!email || !password) {
        throw new ErrorHandler_js_1.default("Please enter email and password", 400);
    }
    const user = (await userModel_js_1.default
        .findOne({ email })
        .select("+password"));
    if (!user) {
        throw new ErrorHandler_js_1.default("Invalid credentials", 400);
    }
    const isPasswordCorrect = (await user.comparePassword(password));
    if (!isPasswordCorrect) {
        throw new ErrorHandler_js_1.default("Invalid credentials", 400);
    }
    return (await (0, jwt_js_1.sendToken)(user));
};
exports.loginUser = loginUser;
// update access token
const updateAccessToken = async (refreshToken) => {
    const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) {
        throw new ErrorHandler_js_1.default("Invalid refresh token", 400);
    }
    const user = (await userModel_js_1.default.findById(decoded.id));
    return (await (0, jwt_js_1.sendToken)(user));
};
exports.updateAccessToken = updateAccessToken;
const updatePassword = async (passwordData, userId) => {
    const { oldPassword, newPassword } = passwordData;
    if (!oldPassword || !newPassword) {
        throw new ErrorHandler_js_1.default("Please enter old and new password", 400);
    }
    const user = (await userModel_js_1.default
        .findById(userId)
        .select("+password"));
    if (user?.password === undefined) {
        throw new ErrorHandler_js_1.default("Initial login required", 404);
    }
    const isPasswordCorrect = (await user.comparePassword(oldPassword));
    if (!isPasswordCorrect) {
        throw new ErrorHandler_js_1.default("Invalid old password", 400);
    }
    user.password = newPassword;
    await user.save();
    await redis_js_1.redis.del(userId);
    await redis_js_1.redis.set(userId, JSON.stringify(user), "EX", 604800); // 7days
    return user;
};
exports.updatePassword = updatePassword;
const updateUserInfo = async (userData, userId) => {
    const user = (await userModel_js_1.default.findById(userId));
    if (!user) {
        throw new ErrorHandler_js_1.default("User not found", 404);
    }
    const { name } = userData;
    if (name && user) {
        user.name = name;
    }
    await user?.save();
    await redis_js_1.redis.del(userId);
    await redis_js_1.redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    return user;
};
exports.updateUserInfo = updateUserInfo;
// update profile picture
const updateProfilePicture = async (avatar, userId) => {
    const user = (await userModel_js_1.default.findById(userId));
    if (!user) {
        throw new ErrorHandler_js_1.default("User not found", 404);
    }
    if (avatar && user) {
        if (user?.avatar?.public_id) {
            await cloudinary_1.default.v2.uploader.destroy(user?.avatar?.public_id);
            const myCloud = await cloudinary_1.default.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150,
            });
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        else {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150,
            });
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
    }
    await user?.save();
    await redis_js_1.redis.del(user._id);
    await redis_js_1.redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    return user;
};
exports.updateProfilePicture = updateProfilePicture;
const socialAuth = async (userData) => {
    const { email, name, avatar, provider } = userData;
    const user = (await userModel_js_1.default.findOne({ email }));
    if (!user) {
        const newUser = (await userModel_js_1.default.create({
            email,
            name,
            avatar: { public_id: avatar, url: avatar },
            provider,
        }));
        return (await (0, jwt_js_1.sendToken)(newUser));
    }
    else {
        // if (!user.avatar?.url && avatar) {
        //   user.avatar = {
        //     public_id: avatar,
        //     url: avatar,
        //   };
        //   await user.save();
        // }
        return (await (0, jwt_js_1.sendToken)(user));
    }
};
exports.socialAuth = socialAuth;
// Get All Users --- Admin
const getAllUsers = async (page, limit, skip, role) => {
    const users = await userModel_js_1.default
        .find({ role })
        .skip(skip)
        .limit(limit)
        .select("-password")
        .sort({ createdAt: -1 });
    const total = await userModel_js_1.default.countDocuments({ role });
    return { users, total };
};
exports.getAllUsers = getAllUsers;
// Update User Role --- Admin
const updateUserRole = async (userData) => {
    const { id, role } = userData;
    const user = await userModel_js_1.default.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
        throw new ErrorHandler_js_1.default("User not found", 404);
    }
    await redis_js_1.redis.del(user._id);
    await redis_js_1.redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    return user;
};
exports.updateUserRole = updateUserRole;
// Delete User --- Admin
const deleteUser = async (userId) => {
    const user = await userModel_js_1.default.findById(userId);
    if (!user) {
        throw new ErrorHandler_js_1.default("User not found", 404);
    }
    await user.deleteOne();
    await redis_js_1.redis.del(userId);
};
exports.deleteUser = deleteUser;

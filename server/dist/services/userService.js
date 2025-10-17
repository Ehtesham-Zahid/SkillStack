import ejs from "ejs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import { redis } from "../utils/redis";
import { sendMail } from "../utils/email";
import { sendToken } from "../utils/jwt";
import ErrorHandler from "../utils/ErrorHandler";
const __dirname = path.resolve();
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({
        user,
        activationCode,
    }, process.env.ACTIVATION_SECRET, {
        expiresIn: "10m",
    });
    return { token, activationCode };
};
// registration user
export const registerUser = async (userData) => {
    const { name, email } = userData;
    const isEmailExist = (await userModel.findOne({ email }));
    if (isEmailExist &&
        (isEmailExist.provider === "google" || isEmailExist.provider === "github")) {
        throw new ErrorHandler(`User already exist with ${isEmailExist.provider} provider`, 400);
    }
    else if (isEmailExist) {
        throw new ErrorHandler("Email already exist", 400);
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
    const html = await ejs.renderFile(path.join(__dirname, "./mails/activation-mail.ejs"), mailData);
    await sendMail({
        to: email,
        subject: "Account Activation",
        html,
    });
    return {
        token: activationToken.token,
        email,
    };
};
export const activateUser = async (activationData) => {
    const { activationToken, activationCode } = activationData;
    const newUser = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
    if (!newUser) {
        throw new ErrorHandler("Invalid activation token", 400);
    }
    if (newUser.activationCode !== activationCode) {
        throw new ErrorHandler("Invalid activation code", 400);
    }
    const { name, email, password } = newUser.user;
    const userExist = (await userModel.findOne({ email }));
    if (userExist) {
        throw new ErrorHandler("User already exist", 400);
    }
    (await userModel.create({ name, email, password }));
};
export const loginUser = async (loginData) => {
    const { email, password } = loginData;
    if (!email || !password) {
        throw new ErrorHandler("Please enter email and password", 400);
    }
    const user = (await userModel
        .findOne({ email })
        .select("+password"));
    if (!user) {
        throw new ErrorHandler("Invalid credentials", 400);
    }
    const isPasswordCorrect = (await user.comparePassword(password));
    if (!isPasswordCorrect) {
        throw new ErrorHandler("Invalid credentials", 400);
    }
    return (await sendToken(user));
};
// update access token
export const updateAccessToken = async (refreshToken) => {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) {
        throw new ErrorHandler("Invalid refresh token", 400);
    }
    const user = (await userModel.findById(decoded.id));
    return (await sendToken(user));
};
export const updatePassword = async (passwordData, userId) => {
    const { oldPassword, newPassword } = passwordData;
    if (!oldPassword || !newPassword) {
        throw new ErrorHandler("Please enter old and new password", 400);
    }
    const user = (await userModel
        .findById(userId)
        .select("+password"));
    if (user?.password === undefined) {
        throw new ErrorHandler("Initial login required", 404);
    }
    const isPasswordCorrect = (await user.comparePassword(oldPassword));
    if (!isPasswordCorrect) {
        throw new ErrorHandler("Invalid old password", 400);
    }
    user.password = newPassword;
    await user.save();
    await redis.del(userId);
    await redis.set(userId, JSON.stringify(user), "EX", 604800); // 7days
    return user;
};
export const updateUserInfo = async (userData, userId) => {
    const user = (await userModel.findById(userId));
    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }
    const { name } = userData;
    if (name && user) {
        user.name = name;
    }
    await user?.save();
    await redis.del(userId);
    await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    return user;
};
// update profile picture
export const updateProfilePicture = async (avatar, userId) => {
    const user = (await userModel.findById(userId));
    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }
    if (avatar && user) {
        if (user?.avatar?.public_id) {
            await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150,
            });
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        else {
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
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
    await redis.del(user._id);
    await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    return user;
};
export const socialAuth = async (userData) => {
    const { email, name, avatar, provider } = userData;
    const user = (await userModel.findOne({ email }));
    if (!user) {
        const newUser = (await userModel.create({
            email,
            name,
            avatar: { public_id: avatar, url: avatar },
            provider,
        }));
        return (await sendToken(newUser));
    }
    else {
        // if (!user.avatar?.url && avatar) {
        //   user.avatar = {
        //     public_id: avatar,
        //     url: avatar,
        //   };
        //   await user.save();
        // }
        return (await sendToken(user));
    }
};
// Get All Users --- Admin
export const getAllUsers = async (page, limit, skip, role) => {
    const users = await userModel
        .find({ role })
        .skip(skip)
        .limit(limit)
        .select("-password")
        .sort({ createdAt: -1 });
    const total = await userModel.countDocuments({ role });
    return { users, total };
};
// Update User Role --- Admin
export const updateUserRole = async (userData) => {
    const { id, role } = userData;
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }
    await redis.del(user._id);
    await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    return user;
};
// Delete User --- Admin
export const deleteUser = async (userId) => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }
    await user.deleteOne();
    await redis.del(userId);
};

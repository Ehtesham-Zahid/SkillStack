"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis_js_1 = require("./redis.js");
const ms_1 = __importDefault(require("ms"));
const sendToken = async (user) => {
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();
    //   upload session to redis
    await redis_js_1.redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    //   options for cookies
    const accessTokenOptions = {
        expires: new Date(Date.now() + (0, ms_1.default)(process.env.ACCESS_TOKEN_EXPIRE)),
        maxAge: (0, ms_1.default)(process.env.ACCESS_TOKEN_EXPIRE),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    };
    const refreshTokenOptions = {
        expires: new Date(Date.now() + (0, ms_1.default)(process.env.REFRESH_TOKEN_EXPIRE)),
        maxAge: (0, ms_1.default)(process.env.REFRESH_TOKEN_EXPIRE),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    };
    return {
        user: user,
        accessToken,
        accessTokenOptions,
        refreshToken,
        refreshTokenOptions,
    };
};
exports.sendToken = sendToken;

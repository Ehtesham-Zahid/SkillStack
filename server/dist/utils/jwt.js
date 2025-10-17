import dotenv from "dotenv";
dotenv.config();
import { redis } from "./redis";
import ms from "ms";
export const sendToken = async (user) => {
    const accessToken = user.signAccessToken();
    const refreshToken = user.signRefreshToken();
    //   upload session to redis
    await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7days
    //   options for cookies
    const accessTokenOptions = {
        expires: new Date(Date.now() + ms(process.env.ACCESS_TOKEN_EXPIRE)),
        maxAge: ms(process.env.ACCESS_TOKEN_EXPIRE),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    };
    const refreshTokenOptions = {
        expires: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRE)),
        maxAge: ms(process.env.REFRESH_TOKEN_EXPIRE),
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

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter your name"] },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: function (value) {
                return emailRegexPattern.test(value);
            },
            message: "please enter a valid email",
        },
        unique: true,
    },
    password: {
        type: String,
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [{ courseId: String }],
    provider: {
        type: String,
        default: "manual",
        enum: ["manual", "google", "github"],
    },
}, { timestamps: true });
// Hash Password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// Sign Access Token
userSchema.methods.signAccessToken = function () {
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });
};
// Sign Refresh Token
userSchema.methods.signRefreshToken = function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    });
};
// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const userModel = mongoose.model("User", userSchema);
export default userModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersAdmin = exports.createOrder = void 0;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const orderModel_js_1 = __importDefault(require("../models/orderModel.js"));
const courseModel_js_1 = __importDefault(require("../models/courseModel.js"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const notificationModel_js_1 = __importDefault(require("../models/notificationModel.js"));
const ErrorHandler_js_1 = __importDefault(require("../utils/ErrorHandler.js"));
const email_js_1 = require("../utils/email.js");
const redis_js_1 = require("../utils/redis.js");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe_1 = __importDefault(require("stripe"));
const __dirname = path_1.default.resolve();
const createOrder = async (data, userId) => {
    const user = await userModel_js_1.default.findById(userId);
    if (!user)
        throw new ErrorHandler_js_1.default("User not found", 404);
    const { courseId, payment_info = {} } = data;
    if (payment_info && "id" in payment_info) {
        const stripeClient = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
        const paymentIntent = await stripeClient.paymentIntents.retrieve(payment_info.id);
        if (paymentIntent.status !== "succeeded") {
            throw new ErrorHandler_js_1.default("Payment failed", 400);
        }
    }
    if (user.courses.some((c) => c.courseId.toString() === courseId)) {
        throw new ErrorHandler_js_1.default("You have already enrolled in this course", 400);
    }
    const course = await courseModel_js_1.default.findById(courseId);
    if (!course)
        throw new ErrorHandler_js_1.default("Course not found", 404);
    const order = await orderModel_js_1.default.create({
        course: { courseId: course._id, name: course.name, price: course.price },
        user: { userId: user._id, name: user.name, email: user.email },
        payment_info,
    });
    // send confirmation email
    const mailData = {
        order: {
            _id: order._id.toString().slice(0, 6),
            name: course.name,
            price: course.price,
            date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        },
    };
    const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "./mails/order-confirmation.ejs"), { data: mailData });
    await (0, email_js_1.sendMail)({ to: user.email, subject: "Order Confirmation", html });
    user.courses.push({ courseId });
    await user.save();
    await notificationModel_js_1.default.create({
        userId: user._id,
        title: "New Order",
        message: `${user.name} purchased ${course.name}.`,
    });
    if (course.purchased !== undefined)
        course.purchased += 1;
    await course.save();
    // 🔥 Invalidate caches
    await redis_js_1.redis.del("allCourses"); // course list
    await redis_js_1.redis.del(courseId); // single course cache
    await redis_js_1.redis.del(userId); // cached user info if applicable
    return course;
};
exports.createOrder = createOrder;
// Get All Orders --- Admin
const getAllOrdersAdmin = async (page, limit, skip) => {
    const orders = await orderModel_js_1.default.find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
    const total = await orderModel_js_1.default.countDocuments({});
    return { orders, total };
};
exports.getAllOrdersAdmin = getAllOrdersAdmin;

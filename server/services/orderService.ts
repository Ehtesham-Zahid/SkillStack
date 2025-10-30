import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
dotenv.config();

import OrderModel from "../models/orderModel.js";
import CourseModel, { ICourse } from "../models/courseModel.js";
import UserModel, { IUser } from "../models/userModel.js";
import NotificationModel from "../models/notificationModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { sendMail } from "../utils/email.js";
import { redis } from "../utils/redis.js";
import { ObjectId } from "mongoose";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import stripe from "stripe";

// Create Order
interface ICreateOrderData {
  courseId: string;
  userId: string;
  payment_info?: object;
}

export const createOrder = async (
  data: ICreateOrderData,
  userId: string
): Promise<ICourse> => {
  const user = await UserModel.findById(userId);
  if (!user) throw new ErrorHandler("User not found", 404);

  const { courseId, payment_info = {} } = data;

  if (payment_info && "id" in payment_info) {
    const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY as string);
    const paymentIntent = await stripeClient.paymentIntents.retrieve(
      payment_info.id as string
    );
    if (paymentIntent.status !== "succeeded") {
      throw new ErrorHandler("Payment failed", 400);
    }
  }

  if (user.courses.some((c) => c.courseId.toString() === courseId)) {
    throw new ErrorHandler("You have already enrolled in this course", 400);
  }

  const course = await CourseModel.findById(courseId);
  if (!course) throw new ErrorHandler("Course not found", 404);

  const order = await OrderModel.create({
    course: { courseId: course._id, name: course.name, price: course.price },
    user: { userId: user._id, name: user.name, email: user.email },
    payment_info,
  });

  // send confirmation email
  const mailData = {
    order: {
      _id: (order._id as ObjectId).toString().slice(0, 6),
      name: course.name,
      price: course.price,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  };

  const templatePath = path.join(__dirname, "../mails/order-confirmation.ejs");

  const html = await ejs.renderFile(templatePath, { data: mailData });
  await sendMail({ to: user.email, subject: "Order Confirmation", html });

  user.courses.push({ courseId });
  await user.save();

  await NotificationModel.create({
    userId: user._id,
    title: "New Order",
    message: `${user.name} purchased ${course.name}.`,
  });

  if (course.purchased !== undefined) course.purchased += 1;
  await course.save();

  // 🔥 Invalidate caches
  await redis.del("allCourses"); // course list
  await redis.del(courseId); // single course cache
  await redis.del(userId); // cached user info if applicable

  return course;
};

// Get All Orders --- Admin
export const getAllOrdersAdmin = async (
  page: number,
  limit: number,
  skip: number
) => {
  const orders = await OrderModel.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await OrderModel.countDocuments({});

  return { orders, total };
};

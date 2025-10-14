import ejs from "ejs";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

import OrderModel from "../models/orderModel";
import CourseModel, { ICourse } from "../models/courseModel";
import UserModel, { IUser } from "../models/userModel";
import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import { sendMail } from "../utils/email";
import { redis } from "../utils/redis";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import stripe from "stripe";

const __dirname = path.resolve();

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
  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }
  const { courseId, payment_info = {} } = data as ICreateOrderData;

  if (payment_info) {
    if ("id" in payment_info) {
      const paymentIntentId = payment_info.id;
      const paymentIntent = await new stripe(
        process.env.STRIPE_SECRET_KEY as string
      ).paymentIntents.retrieve(paymentIntentId as string);
      if (paymentIntent.status !== "succeeded") {
        throw new ErrorHandler("Payment failed", 400);
      }
    }
  }

  const courseExistInUser = user.courses.some(
    (course: any) => course.courseId.toString() === courseId
  );

  if (courseExistInUser) {
    throw new ErrorHandler("You have already enrolled in this course", 400);
  }

  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ErrorHandler("Course not found", 404);
  }

  const orderData: any = {
    course: { courseId: course._id, name: course.name, price: course.price },
    user: { userId: user._id, name: user.name, email: user.email },
    payment_info: payment_info || {},
  };

  const order = await OrderModel.create(orderData);

  const mailData = {
    order: {
      _id: order._id.toString().slice(0, 6),
      name: course?.name,
      price: course?.price,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  };

  const html = await ejs.renderFile(
    path.join(__dirname, "./mails/order-confirmation.ejs"),
    { data: mailData }
  );

  await sendMail({
    to: user.email,
    subject: "Order Confirmation",
    html,
  });

  user.courses.push({ courseId: courseId });
  await redis.set(user._id as string, JSON.stringify(user) as any);
  await user.save();

  await NotificationModel.create({
    userId: user._id,
    title: "New Order",
    message: `${user.name} has purchased the course ${course?.name}.`,
  });

  if (course.purchased !== undefined) course.purchased += 1;

  await course.save();
  await redis.set(course._id as string, JSON.stringify(course) as any);

  // Update the specific course in allCourses cache
  const allCoursesCache = await redis.get("allCourses");
  if (allCoursesCache) {
    const allCourses = JSON.parse(allCoursesCache);
    const courseIndex = allCourses.findIndex((c: any) => c._id === course._id);
    if (courseIndex !== -1) {
      allCourses[courseIndex] = course;
      await redis.set("allCourses", JSON.stringify(allCourses));
    }
  }

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

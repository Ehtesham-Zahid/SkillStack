import ejs from "ejs";
import path from "path";

import OrderModel from "../models/orderModel";
import CourseModel, { ICourse } from "../models/courseModel";
import UserModel, { IUser } from "../models/userModel";
import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import { sendMail } from "../utils/email";

const __dirname = path.resolve();

// Create Order
interface ICreateOrderData {
  courseId: string;
  userId: string;
  payment_info: object;
}
export const createOrder = async (
  data: ICreateOrderData,
  user: IUser
): Promise<ICourse> => {
  const { courseId, payment_info } = data as ICreateOrderData;

  //   const userExist = await UserModel.findById(user._id);

  const courseExistInUser = user?.courses.some(
    (course: any) => course._id.toString() === courseId.toString()
  );

  if (courseExistInUser) {
    throw new ErrorHandler("You have already enrolled in this course", 400);
  }

  const course = await CourseModel.findById(courseId);

  if (!course) {
    throw new ErrorHandler("Course not found", 404);
  }

  const orderData: any = {
    courseId: courseId,
    userId: user._id,
    payment_info: payment_info,
  };

  const order = await OrderModel.create(orderData);

  const mailData = {
    order: {
      _id: courseId.slice(0, 6),
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

  try {
    if (user) {
      await sendMail({
        to: user.email,
        subject: "Order Confirmation",
        html,
      });
    }
  } catch (error) {
    console.log(error);
    throw new ErrorHandler("Error sending email", 500);
  }

  user?.courses.push({ courseId: courseId });
  await user?.save();

  await NotificationModel.create({
    user: user?._id,
    title: "New Order",
    message: `${user.name} has purchased the course ${course?.name}.`,
  });

  course.purchased ? (course.purchased += 1) : course.purchased;

  await course?.save();

  return course;
};

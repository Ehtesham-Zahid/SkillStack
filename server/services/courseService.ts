import mongoose from "mongoose";
import cloudinary from "cloudinary";
import path from "path";
import ejs from "ejs";
import axios from "axios";

import CourseModel, {
  ICourse,
  ICourseData,
  IComment,
} from "../models/courseModel";
import { IUser } from "../models/userModel";
import NotificationModel from "../models/notificationModel";

import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import { sendMail } from "../utils/email";

const __dirname = path.resolve();

// Create Course
export const createCourse = async (data: any): Promise<ICourse> => {
  const thumbnail = data.thumbnail;
  if (thumbnail) {
    const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
      folder: "courses",
      width: 1000,
      crop: "scale",
    });
    data.thumbnail = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const course = await CourseModel.create(data);
  return course;
};

// Edit Course
export const editCourse = async (
  data: any,
  courseId: string
): Promise<ICourse | null> => {
  const course = await CourseModel.findByIdAndUpdate(
    courseId,
    { $set: data },
    { new: true }
  );
  if (!course) throw new ErrorHandler("Course not found", 404);
  return course;
};

// Get Course by ID
export const getCourseById = async (id: string): Promise<ICourse | null> => {
  let course: ICourse | null = null;

  const isCacheExist = await redis.get(id);

  if (isCacheExist) {
    course = JSON.parse(isCacheExist);
  } else {
    course = await CourseModel.findById(id).select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );
    await redis.set(id, JSON.stringify(course), "EX", 604800);
  }

  if (!course) throw new ErrorHandler("Course not found", 404);
  return course;
};

// Get All Courses
export const getAllCourses = async (): Promise<ICourse[]> => {
  let courses: ICourse[] = [];

  const isCacheExist = await redis.get("allCourses");

  if (isCacheExist) {
    courses = JSON.parse(isCacheExist);
  } else {
    courses = await CourseModel.find().select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );
    await redis.set("allCourses", JSON.stringify(courses));
  }

  return courses;
};

// Get Course Content -- only for valid users
export const getCourseContent = async (
  user: IUser,
  courseId: string
): Promise<ICourseData[]> => {
  const userCoursesList = user?.courses;

  const courseExists = userCoursesList?.find(
    (course: any) => course.courseId.toString() === courseId
  );

  if (!courseExists)
    throw new ErrorHandler("You are not enrolled in this course", 404);

  const course = await CourseModel.findById(courseId);
  const content: ICourseData[] = course?.courseData || [];

  return content;
};

interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}
// Add Question to Course
export const addQuestion = async (
  user: IUser,
  data: IAddQuestionData
): Promise<ICourse | null> => {
  const { question, courseId, contentId } = data;
  const course: ICourse | null = await CourseModel.findById(courseId);
  if (!course) {
    throw new ErrorHandler("Course not found", 404);
  }

  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    throw new ErrorHandler("Invalid content id", 400);
  }

  const courseContent: ICourseData | undefined = course?.courseData.find(
    (item: any) => item._id.toString() === contentId
  );

  if (!courseContent) {
    throw new ErrorHandler("Content not found", 404);
  }

  //   Create a new question object
  const newQuestion: any = {
    user: user,
    question: question,
    questionReplies: [],
  };

  //   add the question to the course content
  courseContent.questions.push(newQuestion);

  await NotificationModel.create({
    userId: user._id,
    title: "New Question Received",
    message: `${user.name} has asked a question in ${courseContent.title}.`,
  });

  //   update the course
  await course?.save();

  return course;
};

// Add Answer to Question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}
export const addAnswer = async (
  user: IUser,
  data: IAddAnswerData
): Promise<ICourse | null> => {
  const { answer, courseId, contentId, questionId }: IAddAnswerData = data;

  const course: ICourse | null = await CourseModel.findById(courseId);

  if (!course) {
    throw new ErrorHandler("Course not found", 404);
  }

  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    throw new ErrorHandler("Invalid content id", 400);
  }

  const courseContent: ICourseData | undefined = course?.courseData.find(
    (item: any) => item._id.toString() === contentId
  );

  if (!courseContent) {
    throw new ErrorHandler("Content not found", 404);
  }

  const question: IComment | undefined = courseContent.questions.find(
    (item: any) => item._id.toString() === questionId
  );

  if (!question) {
    throw new ErrorHandler("Question not found", 404);
  }

  const newAnswer: any = {
    user: user,
    answer: answer,
  };

  //   add the answer to the question
  question.questionReplies?.push(newAnswer);

  //   update the course content
  await course?.save();

  //   if (user?._id === question.user._id) {
  //     await NotificationModel.create({
  //       userId: user._id,
  //       title: "New Question Reply Received",
  //       message: `${user.name} has replied to your question in ${courseContent.title}.`,
  //     });
  //   } else {
  //     const data = {
  //       name: question.user.name,
  //       title: courseContent.title,
  //       courseId: courseId,
  //       contentId: contentId,
  //       questionId: questionId,
  //       viewLink: `${process.env.FRONTEND_URL}/course/${courseId}`,
  //       questionText: question.question,
  //       answerText: answer,
  //       replierName: user.name,
  //     };

  //     const html = await ejs.renderFile(
  //       path.join(__dirname, "../mails/question-reply.ejs"),
  //       data
  //     );

  //     try {
  //       await sendMail({
  //         to: question.user.email,
  //         subject: "New Answer to your question",
  //         html,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       throw new ErrorHandler("Error sending email", 500);
  //     }
  //   }

  if (user?._id !== question.user._id) {
    const data = {
      name: question.user.name,
      title: courseContent.title,
      courseId: courseId,
      contentId: contentId,
      questionId: questionId,
      viewLink: `localhost:5173/course/${courseId}`,
      questionText: question.question,
      answerText: answer,
      replierName: user.name,
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "./mails/question-reply.ejs"),
      data
    );

    await sendMail({
      to: question.user.email,
      subject: "New Answer to your question",
      html,
    });
  }
  return course;
};

// Add Review to Course
interface IAddReviewData {
  review: string;
  rating: number;
}

export const addReview = async (
  user: IUser,
  data: IAddReviewData,
  courseId: string
): Promise<ICourse | null> => {
  const userCoursesList = user?.courses;

  console.log(userCoursesList);

  const courseExists = userCoursesList?.some(
    (course: any) => course.courseId.toString() === courseId.toString()
  );
  if (!courseExists) {
    throw new ErrorHandler("You are not enrolled in this course", 404);
  }

  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw new ErrorHandler("Course not found", 404);
  }

  const { rating, review } = data as IAddReviewData;

  const reviewData: any = {
    user: user,
    rating: rating,
    comment: review,
    commentReplies: [],
  };

  course.reviews.push(reviewData);

  let avg = 0;

  course.reviews.forEach((item: any) => {
    avg += item.rating;
  });

  course.ratings = avg / course.reviews.length;

  await course.save();

  const notification = {
    title: "New Review Received",
    message: `${user.name} has reviewed your course ${course.name}.`,
  };

  //   Create a new notification
  await NotificationModel.create({
    userId: user._id,
    title: notification.title,
    message: notification.message,
  });

  return course;
};

// Reply to Review
interface IReplyToReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}

export const addReplyToReview = async (
  user: IUser,
  data: IReplyToReviewData
): Promise<ICourse | null> => {
  const { comment, courseId, reviewId } = data as IReplyToReviewData;

  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw new ErrorHandler("Course not found", 404);
  }

  const review = course.reviews.find(
    (item: any) => item._id.toString() === reviewId
  );
  if (!review) {
    throw new ErrorHandler("Review not found", 404);
  }

  const replyData: any = {
    user: user,
    comment: comment,
  };

  if (!review.commentReplies) {
    review.commentReplies = [];
  }

  review.commentReplies?.push(replyData);

  await course?.save();

  return course;
};

// Get All Courses --- Admin
export const getAllCoursesAdmin = async () => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });
  return courses;
};

// Delete Course --- Admin
export const deleteCourse = async (courseId: string) => {
  const course = await CourseModel.findById(courseId);
  if (!course) {
    throw new ErrorHandler("Course not found", 404);
  }
  await course.deleteOne();
  await redis.del(courseId as string);

  // Delete the specific course in allCourses cache
  const allCoursesCache = await redis.get("allCourses");
  if (allCoursesCache) {
    const allCourses = JSON.parse(allCoursesCache);
    const filteredCourses = allCourses.filter((c: any) => c._id !== courseId);
    await redis.set("allCourses", JSON.stringify(filteredCourses));
  }
};

// Generate Video URL
export const generateVideoURL = async (videoId: any) => {
  const response = await axios.post(
    `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
    { ttl: 300 },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
      },
    }
  );
  return response.data;
};

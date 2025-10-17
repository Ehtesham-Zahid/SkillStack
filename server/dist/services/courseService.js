import mongoose from "mongoose";
import cloudinary from "cloudinary";
import path from "path";
import ejs from "ejs";
import axios from "axios";
import CourseModel from "../models/courseModel";
import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import { sendMail } from "../utils/email";
const __dirname = path.resolve();
// Create Course
export const createCourse = async (data) => {
    const thumbnail = data.thumbnail;
    if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail.url, {
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
    await redis.del("allCourses"); // refresh all courses
    return course;
};
// Edit Course
export const editCourse = async (data, courseId) => {
    const thumbnail = data.thumbnail;
    if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail.url, {
            folder: "courses",
            width: 1000,
            crop: "scale",
        });
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const course = await CourseModel.findByIdAndUpdate(courseId, { $set: data }, { new: true });
    if (!course)
        throw new ErrorHandler("Course not found", 404);
    await redis.del(courseId);
    await redis.del("allCourses");
    return course;
};
// Get Course by ID
export const getCourseById = async (id) => {
    let course = null;
    const isCacheExist = await redis.get(id);
    if (isCacheExist) {
        course = JSON.parse(isCacheExist);
    }
    else {
        course = await CourseModel.findById(id).select("-sections.lessons.videoUrl -sections.lessons.description -sections.lessons.videoPlayer -sections.lessons.suggestion -sections.lessons.questions -sections.lessons.links");
        await redis.set(id, JSON.stringify(course), "EX", 604800);
    }
    if (!course)
        throw new ErrorHandler("Course not found", 404);
    return course;
};
// Get Course by ID
export const getCourseByIdAdmin = async (id) => {
    const course = await CourseModel.findById(id);
    if (!course)
        throw new ErrorHandler("Course not found", 404);
    return course;
};
// Get All Courses
export const getAllCourses = async () => {
    let courses = [];
    const isCacheExist = await redis.get("allCourses");
    if (isCacheExist) {
        courses = JSON.parse(isCacheExist);
    }
    else {
        courses = await CourseModel.find().select("-sections.lessons.videoUrl -sections.lessons.description -sections.lessons.videoPlayer -sections.lessons.suggestion -sections.lessons.questions -sections.lessons.links");
        await redis.set("allCourses", JSON.stringify(courses));
    }
    return courses;
};
// Get Course Content -- only for valid users
export const getCourseWithContent = async (user, courseId) => {
    const userCoursesList = user?.courses;
    const courseExists = userCoursesList?.find((course) => course.courseId.toString() === courseId);
    if (!courseExists)
        throw new ErrorHandler("You are not enrolled in this course", 404);
    const course = await CourseModel.findById(courseId);
    if (!course)
        throw new ErrorHandler("Course not found", 404);
    // const course: ICourse[] = course?.sections || [];
    return course;
};
// Add Question to Course
export const addQuestion = async (user, data) => {
    const { question, courseId, sectionId, lessonId } = data;
    const course = await CourseModel.findById(courseId);
    if (!course) {
        throw new ErrorHandler("Course not found", 404);
    }
    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
        throw new ErrorHandler("Invalid content id", 400);
    }
    const section = course?.sections.find((item) => item._id.toString() === sectionId);
    if (!section) {
        throw new ErrorHandler("Section not found", 404);
    }
    const lesson = section?.lessons.find((item) => item._id.toString() === lessonId);
    if (!lesson) {
        throw new ErrorHandler("Lesson not found", 404);
    }
    //   Create a new question object
    const newQuestion = {
        user: user,
        question: question,
        questionReplies: [],
    };
    //   add the question to the course content
    lesson?.questions.push(newQuestion);
    await NotificationModel.create({
        userId: user._id,
        title: "New Question Received",
        message: `${user.name} has asked a question in ${section?.title} - ${lesson?.title}.`,
    });
    //   update the course
    await course?.save();
    await redis.del(courseId);
    await redis.del("allCourses");
    return course;
};
export const addAnswer = async (user, data) => {
    const { answer, courseId, sectionId, lessonId, questionId } = data;
    const course = await CourseModel.findById(courseId);
    if (!course) {
        throw new ErrorHandler("Course not found", 404);
    }
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
        throw new ErrorHandler("Invalid content id", 400);
    }
    const section = course?.sections.find((item) => item._id.toString() === sectionId);
    if (!section) {
        throw new ErrorHandler("Section not found", 404);
    }
    const lesson = section?.lessons.find((item) => item._id.toString() === lessonId);
    if (!lesson) {
        throw new ErrorHandler("Lesson not found", 404);
    }
    const question = lesson?.questions.find((item) => item._id.toString() === questionId);
    if (!question) {
        throw new ErrorHandler("Question not found", 404);
    }
    const newAnswer = {
        user: user,
        answer: answer,
        createdAt: new Date().toISOString(),
    };
    //   add the answer to the question
    question.questionReplies?.push(newAnswer);
    //   update the course content
    await course?.save();
    await redis.del(courseId);
    await redis.del("allCourses");
    // if (user?._id !== question.user._id) {
    await NotificationModel.create({
        userId: user._id,
        title: "New Question Reply Received",
        message: `${user.name} has replied to question in ${section?.title} - ${lesson?.title}.`,
    });
    // }
    if (user?._id !== question.user._id) {
        const data = {
            name: question.user.name,
            title: section?.title,
            courseId: courseId,
            sectionId: sectionId,
            lessonId: lessonId,
            questionId: questionId,
            viewLink: `localhost:5173/course/${courseId}`,
            questionText: question.question,
            answerText: answer,
            replierName: user.name,
        };
        const html = await ejs.renderFile(path.join(__dirname, "./mails/question-reply.ejs"), data);
        await sendMail({
            to: question.user.email,
            subject: "Your Question Has Been Answered - Learneazy LMS",
            html,
        });
    }
    return course;
};
export const addReview = async (user, data) => {
    const { rating, review, courseId } = data;
    const userCoursesList = user?.courses;
    const courseExists = userCoursesList?.some((course) => course.courseId.toString() === courseId.toString());
    if (!courseExists) {
        throw new ErrorHandler("You are not enrolled in this course", 404);
    }
    const course = await CourseModel.findById(courseId);
    if (!course) {
        throw new ErrorHandler("Course not found", 404);
    }
    const reviewData = {
        user: user,
        rating: rating,
        comment: review,
        commentReplies: [],
    };
    course.reviews.push(reviewData);
    let avg = 0;
    course.reviews.forEach((item) => {
        avg += item.rating;
    });
    course.ratings = avg / course.reviews.length;
    await course.save();
    await redis.del(courseId);
    await redis.del("allCourses");
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
export const addReplyToReview = async (user, data) => {
    const { comment, courseId, reviewId } = data;
    const course = await CourseModel.findById(courseId);
    if (!course) {
        throw new ErrorHandler("Course not found", 404);
    }
    const review = course.reviews.find((item) => item._id.toString() === reviewId);
    if (!review) {
        throw new ErrorHandler("Review not found", 404);
    }
    const replyData = {
        user: user,
        comment: comment,
        createdAt: new Date().toISOString(),
    };
    if (!review.commentReplies) {
        review.commentReplies = [];
    }
    review.commentReplies?.push(replyData);
    await course?.save();
    await redis.del(courseId);
    await redis.del("allCourses");
    return course;
};
// Get All Courses --- Admin
export const getAllCoursesAdmin = async (page, limit, skip) => {
    const courses = await CourseModel.find()
        .skip(skip)
        .limit(limit)
        .select("name ratings purchased createdAt")
        .sort({ createdAt: -1 });
    const total = await CourseModel.countDocuments({});
    return { courses, total };
};
// Delete Course --- Admin
export const deleteCourse = async (courseId) => {
    const course = await CourseModel.findById(courseId);
    if (!course) {
        throw new ErrorHandler("Course not found", 404);
    }
    await course.deleteOne();
    await redis.del(courseId);
    await redis.del("allCourses");
};
// Generate Video URL
export const generateVideoURL = async (videoId) => {
    const response = await axios.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
        },
    });
    return response.data;
};

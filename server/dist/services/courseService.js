"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoURL = exports.deleteCourse = exports.getAllCoursesAdmin = exports.addReplyToReview = exports.addReview = exports.addAnswer = exports.addQuestion = exports.getCourseWithContent = exports.getAllCourses = exports.getCourseByIdAdmin = exports.getCourseById = exports.editCourse = exports.createCourse = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const axios_1 = __importDefault(require("axios"));
const courseModel_js_1 = __importDefault(require("../models/courseModel.js"));
const notificationModel_js_1 = __importDefault(require("../models/notificationModel.js"));
const ErrorHandler_js_1 = __importDefault(require("../utils/ErrorHandler.js"));
const redis_js_1 = require("../utils/redis.js");
const email_js_1 = require("../utils/email.js");
const __dirname = path_1.default.resolve();
// Create Course
const createCourse = async (data) => {
    const thumbnail = data.thumbnail;
    if (thumbnail) {
        const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail.url, {
            folder: "courses",
            width: 1000,
            crop: "scale",
        });
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const course = await courseModel_js_1.default.create(data);
    await redis_js_1.redis.del("allCourses"); // refresh all courses
    return course;
};
exports.createCourse = createCourse;
// Edit Course
const editCourse = async (data, courseId) => {
    const thumbnail = data.thumbnail;
    if (thumbnail) {
        const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail.url, {
            folder: "courses",
            width: 1000,
            crop: "scale",
        });
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const course = await courseModel_js_1.default.findByIdAndUpdate(courseId, { $set: data }, { new: true });
    if (!course)
        throw new ErrorHandler_js_1.default("Course not found", 404);
    await redis_js_1.redis.del(courseId);
    await redis_js_1.redis.del("allCourses");
    return course;
};
exports.editCourse = editCourse;
// Get Course by ID
const getCourseById = async (id) => {
    let course = null;
    const isCacheExist = await redis_js_1.redis.get(id);
    if (isCacheExist) {
        course = JSON.parse(isCacheExist);
    }
    else {
        course = await courseModel_js_1.default.findById(id).select("-sections.lessons.videoUrl -sections.lessons.description -sections.lessons.videoPlayer -sections.lessons.suggestion -sections.lessons.questions -sections.lessons.links");
        await redis_js_1.redis.set(id, JSON.stringify(course), "EX", 604800);
    }
    if (!course)
        throw new ErrorHandler_js_1.default("Course not found", 404);
    return course;
};
exports.getCourseById = getCourseById;
// Get Course by ID
const getCourseByIdAdmin = async (id) => {
    const course = await courseModel_js_1.default.findById(id);
    if (!course)
        throw new ErrorHandler_js_1.default("Course not found", 404);
    return course;
};
exports.getCourseByIdAdmin = getCourseByIdAdmin;
// Get All Courses
const getAllCourses = async () => {
    let courses = [];
    const isCacheExist = await redis_js_1.redis.get("allCourses");
    if (isCacheExist) {
        courses = JSON.parse(isCacheExist);
    }
    else {
        courses = await courseModel_js_1.default.find().select("-sections.lessons.videoUrl -sections.lessons.description -sections.lessons.videoPlayer -sections.lessons.suggestion -sections.lessons.questions -sections.lessons.links");
        await redis_js_1.redis.set("allCourses", JSON.stringify(courses));
    }
    return courses;
};
exports.getAllCourses = getAllCourses;
// Get Course Content -- only for valid users
const getCourseWithContent = async (user, courseId) => {
    const userCoursesList = user?.courses;
    const courseExists = userCoursesList?.find((course) => course.courseId.toString() === courseId);
    if (!courseExists)
        throw new ErrorHandler_js_1.default("You are not enrolled in this course", 404);
    const course = await courseModel_js_1.default.findById(courseId);
    if (!course)
        throw new ErrorHandler_js_1.default("Course not found", 404);
    // const course: ICourse[] = course?.sections || [];
    return course;
};
exports.getCourseWithContent = getCourseWithContent;
// Add Question to Course
const addQuestion = async (user, data) => {
    const { question, courseId, sectionId, lessonId } = data;
    const course = await courseModel_js_1.default.findById(courseId);
    if (!course) {
        throw new ErrorHandler_js_1.default("Course not found", 404);
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(sectionId)) {
        throw new ErrorHandler_js_1.default("Invalid content id", 400);
    }
    const section = course?.sections.find((item) => item._id.toString() === sectionId);
    if (!section) {
        throw new ErrorHandler_js_1.default("Section not found", 404);
    }
    const lesson = section?.lessons.find((item) => item._id.toString() === lessonId);
    if (!lesson) {
        throw new ErrorHandler_js_1.default("Lesson not found", 404);
    }
    //   Create a new question object
    const newQuestion = {
        user: user,
        question: question,
        questionReplies: [],
    };
    //   add the question to the course content
    lesson?.questions.push(newQuestion);
    await notificationModel_js_1.default.create({
        userId: user._id,
        title: "New Question Received",
        message: `${user.name} has asked a question in ${section?.title} - ${lesson?.title}.`,
    });
    //   update the course
    await course?.save();
    await redis_js_1.redis.del(courseId);
    await redis_js_1.redis.del("allCourses");
    return course;
};
exports.addQuestion = addQuestion;
const addAnswer = async (user, data) => {
    const { answer, courseId, sectionId, lessonId, questionId } = data;
    const course = await courseModel_js_1.default.findById(courseId);
    if (!course) {
        throw new ErrorHandler_js_1.default("Course not found", 404);
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(lessonId)) {
        throw new ErrorHandler_js_1.default("Invalid content id", 400);
    }
    const section = course?.sections.find((item) => item._id.toString() === sectionId);
    if (!section) {
        throw new ErrorHandler_js_1.default("Section not found", 404);
    }
    const lesson = section?.lessons.find((item) => item._id.toString() === lessonId);
    if (!lesson) {
        throw new ErrorHandler_js_1.default("Lesson not found", 404);
    }
    const question = lesson?.questions.find((item) => item._id.toString() === questionId);
    if (!question) {
        throw new ErrorHandler_js_1.default("Question not found", 404);
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
    await redis_js_1.redis.del(courseId);
    await redis_js_1.redis.del("allCourses");
    // if (user?._id !== question.user._id) {
    await notificationModel_js_1.default.create({
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
        const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "./mails/question-reply.ejs"), data);
        await (0, email_js_1.sendMail)({
            to: question.user.email,
            subject: "Your Question Has Been Answered - Learneazy LMS",
            html,
        });
    }
    return course;
};
exports.addAnswer = addAnswer;
const addReview = async (user, data) => {
    const { rating, review, courseId } = data;
    const userCoursesList = user?.courses;
    const courseExists = userCoursesList?.some((course) => course.courseId.toString() === courseId.toString());
    if (!courseExists) {
        throw new ErrorHandler_js_1.default("You are not enrolled in this course", 404);
    }
    const course = await courseModel_js_1.default.findById(courseId);
    if (!course) {
        throw new ErrorHandler_js_1.default("Course not found", 404);
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
    await redis_js_1.redis.del(courseId);
    await redis_js_1.redis.del("allCourses");
    const notification = {
        title: "New Review Received",
        message: `${user.name} has reviewed your course ${course.name}.`,
    };
    //   Create a new notification
    await notificationModel_js_1.default.create({
        userId: user._id,
        title: notification.title,
        message: notification.message,
    });
    return course;
};
exports.addReview = addReview;
const addReplyToReview = async (user, data) => {
    const { comment, courseId, reviewId } = data;
    const course = await courseModel_js_1.default.findById(courseId);
    if (!course) {
        throw new ErrorHandler_js_1.default("Course not found", 404);
    }
    const review = course.reviews.find((item) => item._id.toString() === reviewId);
    if (!review) {
        throw new ErrorHandler_js_1.default("Review not found", 404);
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
    await redis_js_1.redis.del(courseId);
    await redis_js_1.redis.del("allCourses");
    return course;
};
exports.addReplyToReview = addReplyToReview;
// Get All Courses --- Admin
const getAllCoursesAdmin = async (page, limit, skip) => {
    const courses = await courseModel_js_1.default.find()
        .skip(skip)
        .limit(limit)
        .select("name ratings purchased createdAt")
        .sort({ createdAt: -1 });
    const total = await courseModel_js_1.default.countDocuments({});
    return { courses, total };
};
exports.getAllCoursesAdmin = getAllCoursesAdmin;
// Delete Course --- Admin
const deleteCourse = async (courseId) => {
    const course = await courseModel_js_1.default.findById(courseId);
    if (!course) {
        throw new ErrorHandler_js_1.default("Course not found", 404);
    }
    await course.deleteOne();
    await redis_js_1.redis.del(courseId);
    await redis_js_1.redis.del("allCourses");
};
exports.deleteCourse = deleteCourse;
// Generate Video URL
const generateVideoURL = async (videoId) => {
    const response = await axios_1.default.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
        },
    });
    return response.data;
};
exports.generateVideoURL = generateVideoURL;

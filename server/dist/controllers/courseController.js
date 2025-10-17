"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGenerateVideoURL = exports.handleGetSingleCourseAdmin = exports.handleDeleteCourse = exports.handleGetAllCoursesAdmin = exports.handleAddReplyToReview = exports.handleAddReview = exports.handleAddAnswer = exports.handleAddQuestion = exports.handleGetCourseWithContent = exports.handleGetAllCourses = exports.handleGetSingleCourse = exports.handleEditCourse = exports.handleCreateCourse = void 0;
const courseService_js_1 = require("../services/courseService.js");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// Create Course
exports.handleCreateCourse = (0, express_async_handler_1.default)(async (req, res, next) => {
    const course = await (0, courseService_js_1.createCourse)(req.body);
    res.status(201).json({ success: true, course });
});
// Edit Course
exports.handleEditCourse = (0, express_async_handler_1.default)(async (req, res, next) => {
    const data = req.body;
    const courseId = req.params.id;
    const course = await (0, courseService_js_1.editCourse)(data, courseId);
    res.status(201).json({ success: true, course });
});
// Get Single Course --- without purchasing
exports.handleGetSingleCourse = (0, express_async_handler_1.default)(async (req, res, next) => {
    const course = await (0, courseService_js_1.getCourseById)(req.params.id);
    res.status(200).json({ success: true, course });
});
// Get All Courses --- without purchasing
exports.handleGetAllCourses = (0, express_async_handler_1.default)(async (req, res, next) => {
    const courses = await (0, courseService_js_1.getAllCourses)();
    res.status(200).json({ success: true, courses });
});
// Get Course Content -- only for valid users
exports.handleGetCourseWithContent = (0, express_async_handler_1.default)(async (req, res, next) => {
    const course = await (0, courseService_js_1.getCourseWithContent)(req.user, req.params.id);
    res.status(200).json({ success: true, course });
});
// Add Question to Course
exports.handleAddQuestion = (0, express_async_handler_1.default)(async (req, res, next) => {
    const course = await (0, courseService_js_1.addQuestion)(req.user, req.body);
    res.status(200).json({ success: true, course });
});
exports.handleAddAnswer = (0, express_async_handler_1.default)(async (req, res, next) => {
    const course = await (0, courseService_js_1.addAnswer)(req.user, req.body);
    res.status(200).json({ success: true, course });
});
// Add Review to Course
exports.handleAddReview = (0, express_async_handler_1.default)(async (req, res, next) => {
    const course = await (0, courseService_js_1.addReview)(req.user, req.body);
    res.status(200).json({ success: true, course });
});
// Add Reply to Review
exports.handleAddReplyToReview = (0, express_async_handler_1.default)(async (req, res, next) => {
    const course = await (0, courseService_js_1.addReplyToReview)(req.user, req.body);
    res.status(200).json({ success: true, course });
});
// Get All Courses --- Admin
exports.handleGetAllCoursesAdmin = (0, express_async_handler_1.default)(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { courses, total } = await (0, courseService_js_1.getAllCoursesAdmin)(page, limit, skip);
    res.status(200).json({
        success: true,
        courses,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalCourses: total,
    });
});
// Delete Course --- Admin
exports.handleDeleteCourse = (0, express_async_handler_1.default)(async (req, res, next) => {
    await (0, courseService_js_1.deleteCourse)(req.params.id);
    res
        .status(200)
        .json({ success: true, message: "Course deleted successfully" });
});
// Get Single Course --- without purchasing
exports.handleGetSingleCourseAdmin = (0, express_async_handler_1.default)(async (req, res, next) => {
    const course = await (0, courseService_js_1.getCourseByIdAdmin)(req.params.id);
    res.status(200).json({ success: true, course });
});
// Generate Video URL
exports.handleGenerateVideoURL = (0, express_async_handler_1.default)(async (req, res, next) => {
    const videoURL = await (0, courseService_js_1.generateVideoURL)(req.body.videoId);
    res.status(200).json({ success: true, videoURL });
});

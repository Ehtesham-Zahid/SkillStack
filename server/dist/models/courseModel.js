"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const reviewSchema = new mongoose_1.Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,
    commentReplies: [Object],
}, { timestamps: true });
const linkSchema = new mongoose_1.Schema({
    title: String,
    url: String,
});
const commentSchema = new mongoose_1.Schema({
    user: Object,
    question: String,
    questionReplies: [Object],
}, { timestamps: true });
const lessonSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    videoUrl: String,
    videoLength: Number,
    videoPlayer: String,
    suggestion: String,
    links: [linkSchema],
    questions: [commentSchema],
});
const sectionSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    lessons: [lessonSchema],
});
const courseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter course name"],
    },
    description: {
        type: String,
        required: [true, "Please enter course description"],
    },
    category: {
        type: String,
        required: [true, "Please enter course category"],
    },
    price: {
        type: Number,
        required: [true, "Please enter course price"],
    },
    discountedPrice: { type: Number },
    thumbnail: {
        public_id: {
            type: String,
            required: [true, "Please enter course thumbnail public id"],
        },
        url: {
            type: String,
            required: [true, "Please enter course thumbnail url"],
        },
    },
    tags: {
        type: String,
        required: [true, "Please enter course tags"],
    },
    level: {
        type: String,
        required: [true, "Please enter course level"],
    },
    demoUrl: {
        type: String,
        required: [true, "Please enter course demo url"],
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    sections: [sectionSchema],
    ratings: {
        type: Number,
        default: 0,
    },
    purchased: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
const courseModel = mongoose_1.default.model("Course", courseSchema);
exports.default = courseModel;

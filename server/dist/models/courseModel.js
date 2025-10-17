import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0,
    },
    comment: String,
    commentReplies: [Object],
}, { timestamps: true });
const linkSchema = new Schema({
    title: String,
    url: String,
});
const commentSchema = new Schema({
    user: Object,
    question: String,
    questionReplies: [Object],
}, { timestamps: true });
const lessonSchema = new Schema({
    title: String,
    description: String,
    videoUrl: String,
    videoLength: Number,
    videoPlayer: String,
    suggestion: String,
    links: [linkSchema],
    questions: [commentSchema],
});
const sectionSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    lessons: [lessonSchema],
});
const courseSchema = new Schema({
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
const courseModel = mongoose.model("Course", courseSchema);
export default courseModel;

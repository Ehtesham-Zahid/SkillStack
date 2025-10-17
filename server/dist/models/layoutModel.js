import mongoose, { Schema } from "mongoose";
const faqSchema = new Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
});
const categorySchema = new Schema({
    title: { type: String },
});
const layoutSchema = new Schema({
    type: { type: String },
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
        title: { type: String },
        subtitle: { type: String },
    },
});
const layoutModel = mongoose.model("Layout", layoutSchema);
export default layoutModel;

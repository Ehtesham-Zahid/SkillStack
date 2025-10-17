import mongoose, { Schema } from "mongoose";
const notificationSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "unread",
    },
}, { timestamps: true });
const notificationModel = mongoose.model("Notification", notificationSchema);
export default notificationModel;

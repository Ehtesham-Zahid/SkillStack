import mongoose, { Schema } from "mongoose";
const orderSchema = new Schema({
    course: {
        type: Object,
        required: true,
    },
    user: {
        type: Object,
        required: true,
    },
    payment_info: {
        type: Object,
        required: true,
    },
}, { timestamps: true });
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;

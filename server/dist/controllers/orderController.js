"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNewPayment = exports.handleSendStripePublishableKey = exports.handleGetAllOrdersAdmin = exports.handleCreateOrder = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderService_js_1 = require("../services/orderService.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe_1 = __importDefault(require("stripe"));
// Create Order
exports.handleCreateOrder = (0, express_async_handler_1.default)(async (req, res, next) => {
    const order = await (0, orderService_js_1.createOrder)(req.body, req.user?._id);
    res.status(201).json({ success: true, course: order });
});
// Get All Orders --- Admin
exports.handleGetAllOrdersAdmin = (0, express_async_handler_1.default)(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { orders, total } = await (0, orderService_js_1.getAllOrdersAdmin)(page, limit, skip);
    res.status(200).json({
        success: true,
        orders,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
    });
});
exports.handleSendStripePublishableKey = (0, express_async_handler_1.default)(async (req, res, next) => {
    const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    res.status(200).json({ success: true, key: stripePublishableKey });
});
exports.handleNewPayment = (0, express_async_handler_1.default)(async (req, res, next) => {
    const mypayment = await new stripe_1.default(process.env.STRIPE_SECRET_KEY).paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
            company: "Skill Stack",
        },
        automatic_payment_methods: {
            enabled: true,
        },
    });
    res
        .status(201)
        .json({ success: true, client_secret: mypayment.client_secret });
});

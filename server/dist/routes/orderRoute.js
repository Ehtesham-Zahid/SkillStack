"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_js_1 = require("../controllers/orderController.js");
const auth_js_1 = require("../middleware/auth.js");
const userController_js_1 = require("../controllers/userController.js");
const orderRouter = express_1.default.Router();
orderRouter.post("/create-order", auth_js_1.isAuthenticated, orderController_js_1.handleCreateOrder);
orderRouter.get("/get-all-orders-admin", userController_js_1.handleUpdateAccessToken, auth_js_1.isAuthenticated, (0, auth_js_1.authorizeRoles)("admin"), orderController_js_1.handleGetAllOrdersAdmin);
orderRouter.get("/get-stripe-publishable-key", orderController_js_1.handleSendStripePublishableKey);
orderRouter.post("/new-payment", auth_js_1.isAuthenticated, orderController_js_1.handleNewPayment);
exports.default = orderRouter;

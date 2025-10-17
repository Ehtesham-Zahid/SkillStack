"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_js_1 = require("./middleware/error.js");
const userRoute_js_1 = __importDefault(require("./routes/userRoute.js"));
const courseRoute_js_1 = __importDefault(require("./routes/courseRoute.js"));
const orderRoute_js_1 = __importDefault(require("./routes/orderRoute.js"));
const notificationRoute_js_1 = __importDefault(require("./routes/notificationRoute.js"));
const analyticsRoute_js_1 = __importDefault(require("./routes/analyticsRoute.js"));
const layoutRoute_js_1 = __importDefault(require("./routes/layoutRoute.js"));
const express_rate_limit_1 = require("express-rate-limit");
// body parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
});
// cookie parser
exports.app.use((0, cookie_parser_1.default)());
// cors => cross origin resource sharing
exports.app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
// routes
exports.app.use("/api/v1/users", userRoute_js_1.default);
exports.app.use("/api/v1/courses", courseRoute_js_1.default);
exports.app.use("/api/v1/orders", orderRoute_js_1.default);
exports.app.use("/api/v1/notifications", notificationRoute_js_1.default);
exports.app.use("/api/v1/analytics", analyticsRoute_js_1.default);
exports.app.use("/api/v1/layouts", layoutRoute_js_1.default);
// testing api
exports.app.get("/test", (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is running",
    });
});
// unknown route
// app.all("/*", (req: Request, res: Response, next: NextFunction) => {
//   const err = new Error(`Route ${req.originalUrl} not found`) as any;
//   err.statusCode = 404;
//   next(err);
// });
// Apply the rate limiting middleware to all requests.
exports.app.use(limiter);
exports.app.use(error_js_1.ErrorMiddleware);

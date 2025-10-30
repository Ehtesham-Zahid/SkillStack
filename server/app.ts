import dotenv from "dotenv";
dotenv.config();

import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import courseRouter from "./routes/courseRoute.js";
import layoutRouter from "./routes/layoutRoute.js";
import analyticsRouter from "./routes/analyticsRoute.js";
import notificationRouter from "./routes/notificationRoute.js";

import { v2 as cloudinary } from "cloudinary";
import { rateLimit } from "express-rate-limit";
import { ErrorMiddleware } from "./middleware/error.js";

// Connect DB and configure cloudinary
connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Create Express app
export const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL as string],
    credentials: true,
  })
);

// Other middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

// Apply rate limiting to all routes
app.use(limiter);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/layouts", layoutRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/notifications", notificationRouter);

// Global error handling middleware (must be last)
app.use(ErrorMiddleware);

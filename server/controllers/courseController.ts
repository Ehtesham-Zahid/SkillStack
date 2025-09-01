import { Request, Response, NextFunction } from "express";
import { createCourse } from "../services/courseService";
import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";

// Create Course
export const handleCreateCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    const thumbnail = data.thumbnail;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
        width: 1000,
        crop: "scale",
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await createCourse(data, res, next);
  }
);

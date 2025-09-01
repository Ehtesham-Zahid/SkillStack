import CourseModel, { ICourse } from "../models/courseModel";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";

// Create Course
export const createCourse = async (data: any): Promise<ICourse> => {
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
  const course = await CourseModel.create(data);
  return course;
};

// Edit Course
export const editCourse = async (
  data: any,
  courseId: string
): Promise<ICourse | null> => {
  const course = await CourseModel.findByIdAndUpdate(
    courseId,
    { $set: data },
    { new: true }
  );
  if (!course) throw new ErrorHandler("Course not found", 404);
  return course;
};

// Get Course by ID
export const getCourseById = async (id: string): Promise<ICourse | null> => {
  let course: ICourse | null = null;

  const isCacheExist = await redis.get(id);

  if (isCacheExist) {
    course = JSON.parse(isCacheExist);
  } else {
    course = await CourseModel.findById(id).select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );
    await redis.set(id, JSON.stringify(course));
  }

  if (!course) throw new ErrorHandler("Course not found", 404);
  return course;
};

// Get All Courses
export const getAllCourses = async (): Promise<ICourse[]> => {
  let courses: ICourse[] = [];

  const isCacheExist = await redis.get("allCourses");

  if (isCacheExist) {
    courses = JSON.parse(isCacheExist);
  } else {
    courses = await CourseModel.find().select(
      "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
    );
    await redis.set("allCourses", JSON.stringify(courses));
  }

  return courses;
};

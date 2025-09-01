import CourseModel, {
  ICourse,
  ICourseData,
  IComment,
} from "../models/courseModel";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import { IUser } from "../models/userModel";
import mongoose from "mongoose";

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

// Get Course Content -- only for valid users
export const getCourseContent = async (
  user: IUser,
  courseId: string
): Promise<ICourseData[]> => {
  const userCoursesList = user?.courses;

  const courseExists = userCoursesList?.find(
    (course: any) => course.courseId.toString() === courseId
  );

  if (!courseExists)
    throw new ErrorHandler("You are not enrolled in this course", 404);

  const course = await CourseModel.findById(courseId);
  const content: ICourseData[] = course?.courseData || [];

  return content;
};

interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}
// Add Question to Course
export const addQuestion = async (
  user: IUser,
  data: IAddQuestionData
): Promise<ICourse | null> => {
  const { question, courseId, contentId } = data;
  const course: ICourse | null = await CourseModel.findById(courseId);
  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    throw new ErrorHandler("Invalid content id", 400);
  }

  const courseContent: ICourseData | undefined = course?.courseData.find(
    (item: any) => item._id.toString() === contentId
  );

  if (!courseContent) {
    throw new ErrorHandler("Content not found", 404);
  }

  //   Create a new question object
  const newQuestion: any = {
    user: user,
    question: question,
    questionReplies: [],
  };

  //   add the question to the course content
  courseContent.questions.push(newQuestion);

  //   update the course content
  await course?.save();

  return course;
};

// Add Answer to Question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}
export const addAnswer = async (
  user: IUser,
  data: IAddAnswerData
): Promise<ICourse | null> => {
  const { answer, courseId, contentId, questionId }: IAddAnswerData = data;

  const course: ICourse | null = await CourseModel.findById(courseId);

  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    throw new ErrorHandler("Invalid content id", 400);
  }

  const courseContent: ICourseData | undefined = course?.courseData.find(
    (item: any) => item._id.toString() === contentId
  );

  if (!courseContent) {
    throw new ErrorHandler("Content not found", 404);
  }

  const question: IComment | undefined = courseContent.questions.find(
    (item: any) => item._id.toString() === questionId
  );

  if (!question) {
    throw new ErrorHandler("Question not found", 404);
  }

  const newAnswer: any = {
    user: user,
    answer: answer,
  };

  //   add the answer to the question
  question.questionReplies?.push(newAnswer);

  //   update the course content
  await course?.save();
  return course;
};

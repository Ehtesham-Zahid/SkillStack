import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./userModel.js";

export interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies?: IComment[];
}

export interface IReview extends Document {
  user: IUser;
  rating?: number;
  comment: string;
  commentReplies?: IComment[];
}

export interface ILink extends Document {
  title: string;
  url: string;
}

export interface ILesson extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoLength: number;
  videoPlayer: string;
  suggestion: string;
  links: ILink[];
  questions: IComment[];
}

export interface ISection extends Document {
  title: string;
  description?: string;
  lessons: ILesson[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  discountedPrice?: number;
  thumbnail: {
    public_id: string;
    url: string;
  };
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  sections: ISection[];
  ratings?: number;
  purchased?: number;
}

const reviewSchema = new Schema<IReview>(
  {
    user: Object,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },
  { timestamps: true }
);

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const commentSchema = new Schema<IComment>(
  {
    user: Object,
    question: String,
    questionReplies: [Object],
  },
  { timestamps: true }
);

const lessonSchema = new Schema<ILesson>({
  title: String,
  description: String,
  videoUrl: String,
  videoLength: Number,
  videoPlayer: String,
  suggestion: String,
  links: [linkSchema],
  questions: [commentSchema],
});

const sectionSchema = new Schema<ISection>({
  title: { type: String, required: true },
  description: String,
  lessons: [lessonSchema],
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: [true, "Please enter course name"],
    },
    description: {
      type: String,
      required: [true, "Please enter course description"],
    },
    category: {
      type: String,
      required: [true, "Please enter course category"],
    },
    price: {
      type: Number,
      required: [true, "Please enter course price"],
    },
    discountedPrice: { type: Number },
    thumbnail: {
      public_id: {
        type: String,
        required: [true, "Please enter course thumbnail public id"],
      },
      url: {
        type: String,
        required: [true, "Please enter course thumbnail url"],
      },
    },
    tags: {
      type: String,
      required: [true, "Please enter course tags"],
    },
    level: {
      type: String,
      required: [true, "Please enter course level"],
    },
    demoUrl: {
      type: String,
      required: [true, "Please enter course demo url"],
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    sections: [sectionSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const courseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default courseModel;

import mongoose, { Document, Model, Schema } from "mongoose";

interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface Layout extends Document {
  type: string;
  faq: FaqItem[];
  categories: Category[];
  banner: {
    title: string;
    subtitle: string;
  };
}

const faqSchema = new Schema<FaqItem>({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

const categorySchema = new Schema<Category>({
  title: { type: String },
});

const layoutSchema = new Schema<Layout>({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    title: { type: String },
    subtitle: { type: String },
  },
});

const layoutModel: Model<Layout> = mongoose.model("Layout", layoutSchema);

export default layoutModel;

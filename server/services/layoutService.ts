import cloudinary from "cloudinary";
import LayoutModel from "../models/layoutModel";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";

// Create Layout
export const createLayout = async (data: any) => {
  const { type } = data;
  const isTypeExist = await LayoutModel.findOne({ type });
  if (isTypeExist) throw new ErrorHandler(`${type} already exists`, 400);

  let layoutData: any = {};

  if (type === "Banner") {
    layoutData = { banner: { title: data.title, subtitle: data.subtitle } };
  } else if (type === "Faqs") {
    layoutData = {
      faq: data.faq.map((item: any) => ({
        question: item.question,
        answer: item.answer,
      })),
    };
  } else if (type === "Categories") {
    layoutData = {
      categories: data.categories.map((item: any) => ({ title: item.title })),
    };
  }

  const layout = await LayoutModel.create({ type, ...layoutData });
  await redis.set(type, JSON.stringify(layout), "EX", 604800); // 7 days cache

  return layout;
};

// Edit Layout
export const editLayout = async (data: any) => {
  const { type } = data;
  const layout = await LayoutModel.findOne({ type });
  if (!layout) throw new ErrorHandler(`${type} layout not found`, 404);

  let updatedFields: any = {};

  if (type === "Banner") {
    updatedFields = {
      "banner.title": data.title,
      "banner.subtitle": data.subtitle,
    };
  } else if (type === "Faqs") {
    updatedFields = {
      faq: data.faq.map((item: any) => ({
        question: item.question,
        answer: item.answer,
      })),
    };
  } else if (type === "Categories") {
    updatedFields = {
      categories: data.categories.map((item: any) => ({ title: item.title })),
    };
  }

  const updatedLayout = await LayoutModel.findByIdAndUpdate(
    layout._id,
    { $set: updatedFields },
    { new: true }
  );

  // Refresh cache
  await redis.del(type);
  await redis.set(type, JSON.stringify(updatedLayout), "EX", 604800);

  return updatedLayout;
};

// Get Layout by Type
export const getLayoutByType = async (type: string) => {
  const cached = await redis.get(type);
  if (cached) return JSON.parse(cached);

  const layout = await LayoutModel.findOne({ type });
  if (layout) await redis.set(type, JSON.stringify(layout), "EX", 604800);

  return layout;
};

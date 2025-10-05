import cloudinary from "cloudinary";
import LayoutModel from "../models/layoutModel";
import ErrorHandler from "../utils/ErrorHandler";

export const createLayout = async (data: any) => {
  console.log("data", data);
  const { type } = data;
  const isTypeExist = await LayoutModel.findOne({ type });
  if (isTypeExist) {
    throw new ErrorHandler(`${type} already exists`, 400);
  }
  if (type === "Banner") {
    const { title, subtitle } = data;
    const banner = {
      title,
      subtitle,
    };
    await LayoutModel.create({ type, banner });
  }
  if (type === "Faqs") {
    const { faq } = data;
    const faqData = faq.map((item: any) => ({
      question: item.question,
      answer: item.answer,
    }));
    await LayoutModel.create({ type, faq: faqData });
  }
  if (type === "Categories") {
    console.log("categories", data);
    const { categories } = data;
    const categoriesData = categories.map((item: any) => ({
      title: item.title,
    }));
    await LayoutModel.create({ type, categories: categoriesData });
  }
  return await LayoutModel.findOne({ type });
};

export const editLayout = async (data: any) => {
  console.log("data", data);

  const { type } = data;
  if (type === "Banner") {
    const bannerData: any = await LayoutModel.findOne({ type });
    const { title, subtitle } = data;

    await LayoutModel.findByIdAndUpdate(bannerData._id, {
      $set: {
        "banner.title": title,
        "banner.subtitle": subtitle,
      },
    });
  }
  if (type === "Faqs") {
    const { faq } = data;
    const faqItem = await LayoutModel.findOne({ type: "Faqs" });
    const faqData = faq.map((item: any) => ({
      question: item.question,
      answer: item.answer,
    }));
    await LayoutModel.findByIdAndUpdate(faqItem?._id, {
      $set: { faq: faqData },
    });
  }
  if (type === "Categories") {
    const { categories } = data;
    const categoriesItem = await LayoutModel.findOne({ type: "Categories" });
    const categoriesData = categories.map((item: any) => ({
      title: item.title,
    }));
    await LayoutModel.findByIdAndUpdate(categoriesItem?._id, {
      $set: { categories: categoriesData },
    });
  }
  return await LayoutModel.findOne({ type });
};

// Get Layout By Type
export const getLayoutByType = async (type: string) => {
  return await LayoutModel.findOne({ type });
};

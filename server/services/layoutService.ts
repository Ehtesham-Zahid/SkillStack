import cloudinary from "cloudinary";
import LayoutModel from "../models/layoutModel";
import ErrorHandler from "../utils/ErrorHandler";

export const createLayout = async (data: any) => {
  const { type } = data;
  const isTypeExist = await LayoutModel.findOne({ type });
  if (isTypeExist) {
    throw new ErrorHandler(`${type} already exists`, 400);
  }
  if (type === "Banner") {
    const { image, title, subtitle } = data;
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "layout",
    });
    const banner = {
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      title,
      subtitle,
    };
    await LayoutModel.create(banner);
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
    const { categories } = data;
    const categoriesData = categories.map((item: any) => ({
      title: item.title,
    }));
    await LayoutModel.create({ type, categories: categoriesData });
  }
  return await LayoutModel.findOne({ type });
};

export const editLayout = async (data: any) => {
  const { type } = data;
  if (type === "Banner") {
    const bannerData: any = await LayoutModel.findOne({ type });
    const { image, title, subtitle } = data;
    if (bannerData) {
      await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "layout",
    });
    const banner = {
      type: "Banner",
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      title,
      subtitle,
    };
    await LayoutModel.findByIdAndUpdate(bannerData._id, { $set: banner });
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

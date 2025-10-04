"use client";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/src/shadcn/ui/dropzone";

import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/src/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shadcn/ui/form";
import { Input } from "@/src/shadcn/ui/input";
import { Textarea } from "@/src/shadcn/ui/textarea";
import Image from "next/image";
import CourseLevelSelector from "./CourseLevelSelector";
import CourseCategorySelector from "./CourseCategorySelector";
import { toast } from "react-hot-toast";

const courseInformationSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  price: z.coerce.number().min(1),
  discountedPrice: z.coerce.number().optional(),
  tags: z.string().min(2),
  level: z.string().min(2),
  demoUrl: z.string().min(2),
  thumbnail: z.object({
    url: z.string().min(1, "Please upload a thumbnail"),
  }),
  category: z.string().min(2),
});

type CourseInformationProps = {
  currentStep: number;
  onStepChange: (nextStepIndex: number) => void;
  courseInfo: any;
  setCourseInfo: (data: any) => void;
};

const CourseInformation = ({
  currentStep,
  onStepChange,
  courseInfo,
  setCourseInfo,
}: CourseInformationProps) => {
  const [file, setFile] = useState<File | undefined>();

  const form = useForm({
    resolver: zodResolver(courseInformationSchema),
    defaultValues: {
      name: courseInfo?.name || "",
      description: courseInfo?.description || "",
      price: courseInfo?.price || "",
      discountedPrice: courseInfo?.discountedPrice || "",
      tags: courseInfo?.tags || "",
      level: courseInfo?.level || "beginner",
      demoUrl: courseInfo?.demoUrl || "",
      thumbnail: courseInfo?.thumbnail || { url: "" },
      category: courseInfo?.category || "web-development",
    },
  });

  const onSubmit = async (data: any) => {
    if (data.discountedPrice === 0) {
      delete data.discountedPrice;
    }
    if (data.price <= data.discountedPrice) {
      toast.error("Discounted price cannot be greater than or equal to price");
      return;
    }
    setCourseInfo({ ...courseInfo, ...data });
    onStepChange(currentStep + 1);
  };

  const handleDrop = (file: File) => {
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          const preview = e.target.result;

          // 🔹 Save it in parent
          setCourseInfo({
            ...courseInfo,
            thumbnail: { url: preview } as any,
          });

          form.setValue(
            "thumbnail",
            { url: preview },
            { shouldValidate: true }
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sm:space-y-8 space-y-6 w-full bg-surface dark:bg-surface-dark  p-5 sm:p-8   rounded-lg shadow-sm shadow-text1 dark:shadow-none"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Course Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Course Name"
                  {...field}
                  type="text"
                  className="py-3 sm:py-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">
                Course Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Course Description"
                  {...field}
                  className="h-48 py-3 sm:py-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex sm:gap-2 gap-6 sm:flex-row flex-col w-full">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-base font-semibold">
                  Course Price
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Course Price"
                    {...field}
                    type="number"
                    value={field.value as number}
                    className="py-3 sm:py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountedPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-base font-semibold">
                  Discounted Price(Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Discounted Price(Optional)"
                    {...field}
                    type="number"
                    value={field.value as number}
                    className="py-3 sm:py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex sm:gap-2 gap-6 sm:flex-row flex-col w-full">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-base font-semibold">
                  Course Level
                </FormLabel>
                <CourseLevelSelector
                  currentLevel={field.value}
                  setCurrentLevel={field.onChange}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-base font-semibold">
                  Course Category
                </FormLabel>
                <CourseCategorySelector
                  currentCategory={field.value}
                  setCurrentCategory={field.onChange}
                />
              </FormItem>
            )}
          />
        </div>
        <div className="flex sm:gap-2 gap-6 sm:flex-row flex-col w-full">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-base font-semibold">
                  Course Tags
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Course Tags"
                    {...field}
                    type="text"
                    className="py-3 sm:py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demoUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-base font-semibold">
                  Demo Url
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Demo Url"
                    {...field}
                    type="text"
                    className="py-3 sm:py-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Dropzone
            accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
            multiple={false}
            onDrop={(acceptedFiles) => {
              if (acceptedFiles.length > 0) {
                handleDrop(acceptedFiles[0]);
              }
            }}
            onError={console.error}
            maxFiles={1}
            src={file ? [file] : undefined}
          >
            <DropzoneEmptyState />
            {/* <DropzoneContent> */}
            {courseInfo?.thumbnail?.url && (
              <div className=" h-[200px] sm:h-[400px] w-full flex flex-col items-center justify-center">
                <Image
                  alt="Preview"
                  className="absolute top-0 left-0 h-full w-full object-contain"
                  src={courseInfo?.thumbnail?.url}
                  width={1000}
                  height={1000}
                />
              </div>
            )}
            {/* </DropzoneContent> */}
          </Dropzone>
          {courseInfo?.thumbnail?.url && (
            <p className="text-sm text-text2 dark:text-text2-dark text-center mt-3 font-semibold">
              Click to change thumbnail.
            </p>
          )}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                {/* hidden input to keep it registered */}
                <FormControl>
                  <Input type="hidden" {...field} value={field.value.url} />
                </FormControl>
                {/* this will show the error */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className=" cursor-pointer mt-2 text-white text-base ml-auto w-32"
            size="lg"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseInformation;

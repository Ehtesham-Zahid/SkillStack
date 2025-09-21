"use client";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/src/shadcn/ui/dropzone";

import { z } from "zod";
import { useEffect, useState } from "react";
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

const courseInformationSchema = z.object({
  courseName: z.string().min(2),
  courseDescription: z.string().min(2),
  coursePrice: z.coerce.number().min(1),
  courseDiscountedPrice: z.coerce.number().min(1),
  courseTags: z.string().min(2),
  courseLevel: z.string().min(2),
  courseDemoUrl: z.string().min(2),
  courseThumbnail: z.string().min(1, "Please upload a thumbnail"),
});

type CourseInformationProps = {
  currentStep: number;
  onStepChange: (nextStepIndex: number) => void;
};

const CourseInformation = ({
  currentStep,
  onStepChange,
}: CourseInformationProps) => {
  const [file, setFile] = useState<File | undefined>();
  const [filePreview, setFilePreview] = useState<string | undefined>();

  const form = useForm({
    resolver: zodResolver(courseInformationSchema),
    defaultValues: {
      courseName: "",
      courseDescription: "",
      coursePrice: 0,
      courseDiscountedPrice: 0,
      courseTags: "",
      courseLevel: "",
      courseDemoUrl: "",
      courseThumbnail: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    onStepChange(currentStep + 1);
  };

  const handleDrop = (file: File) => {
    console.log(file);
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setFilePreview(e.target?.result);
        }

        form.setValue("courseThumbnail", e.target?.result as string, {
          shouldValidate: true,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full bg-surface dark:bg-surface-dark p-8 rounded-lg shadow-sm shadow-text1 dark:shadow-none"
      >
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Course Name" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Course Description"
                  {...field}
                  className="h-48"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="coursePrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Course Price</FormLabel>
                <FormControl>
                  <Input placeholder="Course Price" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseDiscountedPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Discounted Price(Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Discounted Price(Optional)"
                    {...field}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="courseTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Tags</FormLabel>
              <FormControl>
                <Input placeholder="Course Tags" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="courseLevel"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Course Level</FormLabel>
                <FormControl>
                  <Input placeholder="Course Level" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseDemoUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Demo Url</FormLabel>
                <FormControl>
                  <Input placeholder="Demo Url" {...field} type="text" />
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
            <DropzoneContent>
              {filePreview && (
                <div className="h-[400px] w-full">
                  <img
                    alt="Preview"
                    className="absolute top-0 left-0 h-full w-full object-contain"
                    src={filePreview}
                  />
                </div>
              )}
            </DropzoneContent>
          </Dropzone>
          <FormField
            control={form.control}
            name="courseThumbnail"
            render={({ field }) => (
              <FormItem>
                {/* hidden input to keep it registered */}
                <FormControl>
                  <Input type="hidden" {...field} />
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

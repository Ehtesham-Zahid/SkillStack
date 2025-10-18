"use client";

import CoursePlayer from "@/src/components/shared/CoursePlayer";
import { Badge } from "@/src/shadcn/ui/badge";
import { Button } from "@/src/shadcn/ui/button";
import { Input } from "@/src/shadcn/ui/input";
import { Separator } from "@/src/shadcn/ui/separator";
import { CheckIcon } from "lucide-react";
import Ratings from "@/src/components/shared/Ratings";

type CoursePreviewProps = {
  currentStep: number;
  onStepChange: (nextStepIndex: number) => void;
  courseData: any;
  handleCourse: any;
};

const CoursePreview = ({
  currentStep,
  onStepChange,
  courseData,
  handleCourse,
}: CoursePreviewProps) => {
  const totalLessons = Array.isArray(courseData?.sections)
    ? courseData.sections.reduce(
        (acc: number, section: any) => acc + (section?.lessons?.length || 0),
        0
      )
    : 0;

  const totalMinutes = Array.isArray(courseData?.sections)
    ? courseData.sections.reduce((acc: number, section: any) => {
        const sectionMinutes = Array.isArray(section?.lessons)
          ? section.lessons.reduce(
              (sum: number, lesson: any) => sum + (lesson?.videoLength || 0),
              0
            )
          : 0;
        return acc + sectionMinutes;
      }, 0)
    : 0;

  const handlePrev = () => {
    onStepChange(currentStep - 1);
  };

  const handleNext = () => {
    handleCourse();
  };

  return (
    <div className="w-full bg-surface dark:bg-surface-dark sm:p-8 p-5 rounded-lg shadow-sm shadow-text1 dark:shadow-none">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-4xl font-bold dark:text-text1-dark text-text1">
          Course Preview
        </p>
        <p className=" dark:text-text2-dark text-text2 font-medium">
          Preview your course before creating it.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="h-[400px] w-full xl:h-auto col-span-3 xl:col-span-2">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.name}
          />
        </div>
        <div className="col-span-3 xl:col-span-1 border dark:border-text2-dark border-text2 rounded-md p-5 flex flex-col gap-5">
          {courseData?.discountedPrice && courseData?.discountedPrice > 0 ? (
            <div className="flex gap-3 items-end">
              <p className="text-3xl font-bold dark:text-text1-dark text-text1">
                ${courseData?.discountedPrice}
              </p>
              <p className="text-xl font-medium dark:text-text2-dark text-text2 line-through">
                ${courseData?.price}
              </p>
            </div>
          ) : (
            <div className="flex gap-2">
              <p className="text-xl font-bold dark:text-text1-dark text-text1">
                ${courseData?.price}
              </p>
            </div>
          )}
          <Button
            type="button"
            className="w-full text-lg cursor-not-allowed "
            size={"lg"}
            disabled={true}
          >
            Buy Now
          </Button>
          <div className="flex gap-2 border-b dark:border-text2-dark border-text2 pb-5">
            <Input
              placeholder="Coupon Code"
              className="flex-1"
              disabled={true}
            />
            <Button
              type="button"
              className="cursor-not-allowed dark:text-text1-dark text-text1 bg-transparent border dark:border-text2-dark border-text2 hover:border-primary dark:hover:border-primary hover:bg-transparent"
              disabled={true}
            >
              Apply
            </Button>
          </div>
          <div className="flex flex-col  gap-2 border-b dark:border-text2-dark border-text2 pb-5">
            <p className="text-base font-bold dark:text-text2-dark text-text2">
              This course includes:
            </p>
            <p className="flex items-center gap-2 text-sm dark:text-text1-dark text-text1">
              <CheckIcon className="w-4 h-4 inline-block" /> Lifetime Access
            </p>
            <p className="flex items-center gap-2 text-sm dark:text-text1-dark text-text1">
              <CheckIcon className="w-4 h-4 inline-block" /> 24/7 Support
            </p>
            <p className="flex items-center gap-2 text-sm dark:text-text1-dark text-text1">
              <CheckIcon className="w-4 h-4 inline-block" /> Certificate of
              Completion
            </p>
          </div>
          <div className="flex flex-col  gap-2 ">
            <div className="flex items-center  justify-between">
              <p className="text-sm dark:text-text2-dark text-text2">
                Category:
              </p>
              <p className="text-sm dark:text-text1-dark text-text1 font-bold">
                {courseData?.category}
              </p>
            </div>
            <div className="flex items-center  justify-between">
              <p className="text-sm dark:text-text2-dark text-text2">Level:</p>
              <p className="text-sm dark:text-text1-dark text-text1 font-bold">
                {courseData?.level}
              </p>
            </div>
            <div className="flex items-center  justify-between">
              <p className="text-sm dark:text-text2-dark text-text2">
                Language:
              </p>
              <p className="text-sm dark:text-text1-dark text-text1 font-bold">
                English
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col gap-5">
          <p className="text-4xl font-bold dark:text-text1-dark text-text1 capitalize">
            {courseData?.name || "Untitled Course"}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Ratings rating={courseData?.ratings || 0} />
            <span className="dark:text-text2-dark text-text2">
              ({courseData?.ratings || 0} Reviews)
            </span>
            <span className="dark:text-text2-dark text-text2">
              {courseData?.purchased || 0} Students
            </span>
            <Badge className=" bg-orange-200  text-orange-500 font-bold capitalize">
              {courseData?.level || "Beginner"}
            </Badge>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold dark:text-text1-dark text-text1">
            What you&apos;ll learn
          </p>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            {(courseData?.benefits?.length
              ? courseData.benefits
              : [{ title: "Add course benefits in Course Options" }]
            ).map((item: any, idx: number) => (
              <p
                key={`benefit-${idx}`}
                className="flex items-start gap-2 text-sm dark:text-text2-dark text-text2"
              >
                <CheckIcon className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{item?.title || "Benefit"}</span>
              </p>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold dark:text-text1-dark text-text1">
            Prerequisites
          </p>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            {(courseData?.prerequisites?.length
              ? courseData.prerequisites
              : [{ title: "Add prerequisites in Course Options" }]
            ).map((item: any, idx: number) => (
              <p
                key={`pre-${idx}`}
                className="flex items-start gap-2 text-sm dark:text-text2-dark text-text2"
              >
                <CheckIcon className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{item?.title || "Prerequisite"}</span>
              </p>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-3">
          <p className="text-2xl font-semibold dark:text-text1-dark text-text1 capitalize">
            Course Description
          </p>
          <p className="text-sm leading-6 dark:text-text2-dark text-text2">
            {courseData?.description ||
              "Add a compelling description in Course Information."}
          </p>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={handlePrev}
          className=" cursor-pointer mt-2 dark:text-text1-dark text-text1  text-base w-32  border dark:border-text2-dark border-text2   hover:border-primary dark:hover:border-primary-dark bg-transparent hover:bg-transparent"
          size="lg"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className=" cursor-pointer mt-2 text-white text-base w-32"
          size="lg"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CoursePreview;

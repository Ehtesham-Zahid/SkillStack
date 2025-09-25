"use client";

import CoursePlayer from "@/src/components/shared/CoursePlayer";
import { Badge } from "@/src/shadcn/ui/badge";
import { Button } from "@/src/shadcn/ui/button";
import { Input } from "@/src/shadcn/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shadcn/ui/accordion";
import { Separator } from "@/src/shadcn/ui/separator";
import { CheckIcon } from "lucide-react";

type CoursePreviewProps = {
  currentStep: number;
  onStepChange: (nextStepIndex: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

const CoursePreview = ({
  currentStep,
  onStepChange,
  courseData,
  handleCourseCreate,
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

  return (
    <div className="w-full bg-surface dark:bg-surface-dark p-8 rounded-lg shadow-sm shadow-text1 dark:shadow-none">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-4xl font-bold dark:text-text1-dark text-text1">
          Course Preview
        </p>
        <p className=" dark:text-text2-dark text-text2 font-medium">
          Preview your course before creating it.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.name}
          />
        </div>
        <div className="col-span-1 border dark:border-text2-dark border-text2 rounded-md p-5 flex flex-col gap-5">
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
            className="w-full text-lg cursor-pointer"
            size={"lg"}
          >
            Buy Now
          </Button>
          <div className="flex gap-2 border-b dark:border-text2-dark border-text2 pb-5">
            <Input placeholder="Coupon Code" className="flex-1" />
            <Button
              type="button"
              className="dark:text-text1-dark text-text1 bg-transparent border dark:border-text2-dark border-text2 hover:border-primary dark:hover:border-primary cursor-pointer hover:bg-transparent"
            >
              Apply
            </Button>
          </div>
          <div className="flex flex-col  gap-2 border-b dark:border-text2-dark border-text2 pb-5">
            <p className="text-base font-bold dark:text-text1-dark text-text1">
              This course includes:
            </p>
            <p className="flex items-center gap-2 text-sm dark:text-text2-dark text-text2">
              <CheckIcon className="w-4 h-4 inline-block" /> Lifetime Access
            </p>
            <p className="flex items-center gap-2 text-sm dark:text-text2-dark text-text2">
              <CheckIcon className="w-4 h-4 inline-block" /> 24/7 Support
            </p>
            <p className="flex items-center gap-2 text-sm dark:text-text2-dark text-text2">
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
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold dark:text-text1-dark text-text1">
            {courseData?.name || "Untitled Course"}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="dark:text-text2-dark text-text2">0 ratings</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="dark:text-text2-dark text-text2">0 students</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="dark:text-text2-dark text-text2 capitalize">
              {courseData?.category?.replaceAll("-", " ") || "category"}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="dark:text-text2-dark text-text2">
              {totalLessons} lessons • {totalMinutes} min
            </span>
            <Badge variant="secondary" className="ml-auto">
              {courseData?.level || "beginner"}
            </Badge>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold dark:text-text1-dark text-text1">
            What you'll learn
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
          <p className="text-lg font-bold dark:text-text1-dark text-text1">
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
          <p className="text-lg font-bold dark:text-text1-dark text-text1">
            Course description
          </p>
          <p className="text-sm leading-6 dark:text-text2-dark text-text2">
            {courseData?.description ||
              "Add a compelling description in Course Information."}
          </p>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold dark:text-text1-dark text-text1">
            Curriculum
          </p>
          <Accordion type="single" collapsible className="w-full">
            {Array.isArray(courseData?.sections) &&
            courseData.sections.length > 0 ? (
              courseData.sections.map((section: any, sIdx: number) => (
                <AccordionItem
                  key={`sec-${sIdx}`}
                  value={`sec-${sIdx}`}
                  className="border dark:border-text2-dark border-text2 rounded-md px-5"
                >
                  <AccordionTrigger className="py-3 text-base font-semibold dark:text-text1-dark text-text1 hover:no-underline">
                    <div className="flex items-center justify-between w-full gap-3">
                      <span className="truncate">
                        {section?.title || `Section ${sIdx + 1}`}
                      </span>
                      <span className="text-xs font-medium dark:text-text2-dark text-text2 whitespace-nowrap">
                        {section?.lessons?.length || 0} lessons
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="flex flex-col">
                      {Array.isArray(section?.lessons) &&
                      section.lessons.length > 0 ? (
                        section.lessons.map((lesson: any, lIdx: number) => (
                          <div
                            key={`les-${sIdx}-${lIdx}`}
                            className="flex items-center justify-between py-2 border-b last:border-b-0 dark:border-text2-dark border-text2"
                          >
                            <p className="text-sm dark:text-text2-dark text-text2 truncate pr-3">
                              {lesson?.title || `Lesson ${lIdx + 1}`}
                            </p>
                            <span className="text-xs dark:text-text2-dark text-text2 whitespace-nowrap">
                              {lesson?.videoLength || 0} min
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm dark:text-text2-dark text-text2">
                          No lessons added.
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="border dark:border-text2-dark border-text2 rounded-md p-5 text-sm dark:text-text2-dark text-text2">
                No curriculum added yet. Add sections and lessons in Course
                Content.
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;

"use client";

import CourseInformation from "@/src/components/features/admin/course/CourseInformation";
import { useEffect, useState } from "react";
import CreateCourseStages from "@/src/components/features/admin/course/CreateCourseStages";
import CourseOptions from "@/src/components/features/admin/course/CourseOptions";
import CourseContent from "@/src/components/features/admin/course/CourseContent";
import CoursePreview from "@/src/components/features/admin/course/CoursePreview";
import {
  useEditCourseMutation,
  useGetSingleCourseAdminQuery,
} from "@/src/redux/features/course/courseApi";
import { toast } from "react-hot-toast";
import { redirect, useParams, useRouter } from "next/navigation";
import Spinner from "@/src/components/ui/Spinner";

const page = () => {
  const { id } = useParams();
  const {
    data: course,
    isLoading: isCourseLoading,
    isSuccess: isCourseSuccess,
  } = useGetSingleCourseAdminQuery(id as string);

  const [editCourse, { isLoading, isSuccess, error }] = useEditCourseMutation();
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course edited successfully");
      router.push("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  const [courseInfo, setCourseInfo] = useState(course?.course);
  const [benefits, setBenefits] = useState(course?.course.benefits);
  const [prerequisites, setPrerequisites] = useState(
    course?.course.prerequisites
  );
  const [courseData, setCourseData] = useState(course?.course);
  const [courseContentData, setCourseContentData] = useState(
    course?.course.sections
  );

  useEffect(() => {
    if (course?.course && isCourseSuccess) {
      setCourseInfo(course?.course);
      setBenefits(course?.course.benefits);
      setPrerequisites(course?.course.prerequisites);
      setCourseData(course?.course);
      setCourseContentData(course?.course.sections);
    }
  }, [course, isCourseSuccess]);

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit: any) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite: any) => ({
      title: prerequisite.title,
    }));

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      category: courseInfo.category,
      price: courseInfo.price,
      discountedPrice: courseInfo.discountedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.reduce(
        (acc: number, section: any) => acc + section.lessons.length,
        0
      ),
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      sections: courseContentData,
    };

    setCourseData(data);
  };

  const [currentStep, setCurrentStep] = useState(0);

  const handleCourseEdit = async () => {
    if (!isLoading) {
      await editCourse({ data: courseData, id: id as string });
    }
  };

  let component = null;

  if (currentStep === 0) {
    component = (
      <CourseInformation
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        courseInfo={courseInfo}
        setCourseInfo={setCourseInfo}
      />
    );
  }

  if (currentStep === 1) {
    component = (
      <CourseOptions
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        benefits={benefits}
        prerequisites={prerequisites}
        setBenefits={setBenefits}
        setPrerequisites={setPrerequisites}
      />
    );
  }

  if (currentStep === 2) {
    component = (
      <CourseContent
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        courseContentData={courseContentData}
        setCourseContentData={setCourseContentData}
        handleSubmit={handleSubmit}
      />
    );
  }

  if (currentStep === 3) {
    component = (
      <CoursePreview
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        courseData={courseData}
        handleCourse={handleCourseEdit}
      />
    );
  }

  return isLoading || isCourseLoading || !courseInfo ? (
    <Spinner />
  ) : (
    <div className="w-full flex  flex-col gap-10 mb-10">
      <div className=" ">
        <CreateCourseStages
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>
      {component}
    </div>
  );
};

export default page;

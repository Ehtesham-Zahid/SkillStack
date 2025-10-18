"use client";

import CourseInformation from "@/src/components/features/admin/course/CourseInformation";
import { useEffect, useState } from "react";
import CreateCourseStages from "@/src/components/features/admin/course/CreateCourseStages";
import CourseOptions from "@/src/components/features/admin/course/CourseOptions";
import CourseContent from "@/src/components/features/admin/course/CourseContent";
import CoursePreview from "@/src/components/features/admin/course/CoursePreview";
import { useCreateCourseMutation } from "@/src/redux/features/course/courseApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/src/components/ui/Spinner";
const Page = () => {
  const [createCourse, { isLoading, isError, isSuccess, error }] =
    useCreateCourseMutation();
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      router.push("/admin/courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error, router]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    tags: "",
    level: "beginner",
    category: "web-development",
    demoUrl: "",
    thumbnail: { url: "" },
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseData, setCourseData] = useState({});
  const [courseContentData, setCourseContentData] = useState([
    {
      title: "Untitled Section",
      lessons: [
        {
          title: "Lesson 1",
          description: "",
          videoUrl: "",
          videoLength: undefined,
          videoPlayer: "vdocipher", // or default value
          suggestion: "",
          links: [
            {
              title: "",
              url: "",
            },
          ],
        },
      ],
    },
  ]);

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
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

  const handleCourseCreate = async () => {
    if (!isLoading) {
      await createCourse(courseData);
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
        handleCourse={handleCourseCreate}
      />
    );
  }

  return isLoading ? (
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

export default Page;

"use client";

import CourseInformation from "@/src/components/features/admin/course/CourseInformation";
import { useEffect, useState } from "react";
import CreateCourseStages from "@/src/components/features/admin/course/CreateCourseStages";
import CourseOptions from "@/src/components/features/admin/course/CourseOptions";
import CourseContent from "@/src/components/features/admin/course/CourseContent";
const page = () => {
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    tags: "",
    level: "beginner",
    category: "web-development",
    demoUrl: "",
    thumbnail: "",
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
          videoLength: 0,
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

    // const formattedCourseContentData = courseContentData.map(
    //   (courseContent) => ({
    //     videoUrl: courseContent.videoUrl,
    //     title: courseContent.title,
    //     description: courseContent.description,
    //     videoLength: courseContent.videoLength,
    //     videoSection: courseContent.videoSection,
    //     links: courseContent.links.map((link) => ({
    //       title: link.title,
    //       url: link.url,
    //     })),
    //     suggestion: courseContent.suggestion,
    //   })
    // );

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

    console.log("DATA", data);

    setCourseData(data);
  };

  const [currentStep, setCurrentStep] = useState(2);
  //   const [completedSteps, setCompletedSteps] = useState<boolean[]>([
  //     false,
  //     false,
  //     false,
  //     false,
  //   ]);

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
  return (
    <div className="w-full flex lg:flex-row flex-col gap-10 mb-10">
      {component}
      <CreateCourseStages
        currentStep={currentStep}
        // completedSteps={completedSteps}
        onStepChange={setCurrentStep}
      />
    </div>
  );
};

export default page;

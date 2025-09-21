"use client";

import CourseInformation from "@/src/components/features/admin/course/CourseInformation";
import { useEffect, useState } from "react";
import CreateCourseStages from "@/src/components/features/admin/course/CreateCourseStages";
import CourseOptions from "@/src/components/features/admin/course/CourseOptions";
const page = () => {
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    tags: "",
    level: "",
    // categories: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseData, setCourseData] = useState({});
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      videoLength: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
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

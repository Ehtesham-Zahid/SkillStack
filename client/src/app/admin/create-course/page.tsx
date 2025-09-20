"use client";

import CourseInformation from "@/src/components/features/admin/course/CourseInformation";
import { useEffect, useState } from "react";
import CreateCourseStages from "@/src/components/features/admin/course/CreateCourseStages";
import CourseOptions from "@/src/components/features/admin/course/CourseOptions";
const page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  //   const [completedSteps, setCompletedSteps] = useState<boolean[]>([
  //     false,
  //     false,
  //     false,
  //     false,
  //   ]);
  const handleStepChange = (nextStepIndex: number) => {
    setCurrentStep(nextStepIndex);
  };
  let component = null;

  if (currentStep === 0) {
    component = (
      <CourseInformation
        currentStep={currentStep}
        onStepChange={handleStepChange}
      />
    );
  }
  if (currentStep === 1) {
    component = <CourseOptions />;
  }

  return (
    <div className="w-full flex lg:flex-row flex-col gap-10 mb-10">
      {component}
      <CreateCourseStages
        currentStep={currentStep}
        // completedSteps={completedSteps}
        onStepChange={handleStepChange}
      />
    </div>
  );
};

export default page;

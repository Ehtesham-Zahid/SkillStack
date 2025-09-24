"use client";

import CoursePlayer from "./CoursePlayer";

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
  return (
    <div>
      <h1>Course Preview</h1>
      <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.name} />
    </div>
  );
};

export default CoursePreview;

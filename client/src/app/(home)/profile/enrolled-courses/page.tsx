import React from "react";
import Heading from "@/src/utils/Heading";
import EnrolledCourses from "@/src/components/features/profile/EnrolledCourses";

const page = () => {
  return (
    <>
      <Heading
        title="SkillStack | My Enrolled Courses"
        description="View and manage all your enrolled courses, track your learning progress, and continue your educational journey"
        keywords="Enrolled Courses, My Courses, Learning Progress, Course Dashboard, Continue Learning, Student Portal"
      />
      <div className="w-full">
        <EnrolledCourses />
      </div>
    </>
  );
};

export default page;

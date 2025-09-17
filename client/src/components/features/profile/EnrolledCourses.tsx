import React from "react";
import CourseCard from "../course/CourseCard";

const EnrolledCourses = () => {
  return (
    <div className="w-full  h-full flex flex-col items-start justify-start">
      {/* <h1 className="text-4xl font-bold text-center mb-8">Enrolled Courses</h1> */}
      <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default EnrolledCourses;

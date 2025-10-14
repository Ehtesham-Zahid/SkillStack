"use client";
import React from "react";
import CourseCard from "../course/CourseCard";
import { useSelector } from "react-redux";
import { IoBook } from "react-icons/io5";

const EnrolledCourses = () => {
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);
  return (
    <div className="w-full  h-full flex flex-col items-start justify-start">
      {/* <h1 className="text-4xl font-bold text-center mb-8">Enrolled Courses</h1> */}

      {user?.courses?.length > 0 ? (
        <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {user?.courses?.map((course: any) => (
            <CourseCard
              key={course._id}
              id={course.courseId}
              title={course?.name}
              author={"Ehtesham Zahid"}
              price={course?.price}
              students={course?.purchased || 0}
              lessons={course?.sections?.length || 0}
              rating={course?.ratings || 0}
              accent={"primary"}
              thumbnailSrc={course?.thumbnail?.url}
              enrolled={true}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <IoBook size={64} className="text-gray-500 mb-4" />
          <h1 className="text-4xl font-bold text-center mb-8">
            No enrolled courses
          </h1>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;

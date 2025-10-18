"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "../course/CourseCard";
import { useSelector } from "react-redux";
import { IoBook } from "react-icons/io5";
import { useGetAllCoursesQuery } from "@/src/redux/features/course/courseApi";
import Link from "next/link";

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useSelector((state: any) => state.auth);

  const { data: coursesData, isLoading: coursesLoading } =
    useGetAllCoursesQuery();

  useEffect(() => {
    if (coursesData && user?.courses && Array.isArray(user.courses)) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          coursesData.courses.find(
            (course: any) => course._id === userCourse.courseId
          )
        )
        .filter((course: any) => course !== undefined);
      setEnrolledCourses(filteredCourses);
    }
  }, [coursesData, user?.courses]);
  return (
    <div className="w-full  h-full flex flex-col items-start justify-start">
      {/* <h1 className="text-4xl font-bold text-center mb-8">Enrolled Courses</h1> */}

      {enrolledCourses?.length > 0 ? (
        <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {enrolledCourses?.map((course: any) => (
            <CourseCard
              key={course._id}
              id={course._id}
              title={course?.name}
              author={"Ehtesham Zahid"}
              price={course?.price}
              students={course?.purchased || 0}
              lessons={course?.sections?.length || 0}
              rating={course?.ratings || 0}
              accent={"primary"}
              thumbnailSrc={course?.thumbnail?.url}
              enrolled={true}
              discountedPrice={course?.discountedPrice}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center py-16 px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-primary-dark/20 dark:to-primary-dark/10 rounded-full blur-xl"></div>
            <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary-dark/10 dark:to-primary-dark/5 rounded-full p-8 mb-6">
              <IoBook
                size={80}
                className="text-primary dark:text-primary-dark"
              />
            </div>
          </div>

          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No Enrolled Courses Yet
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Start your learning journey by exploring our amazing courses and
              enrolling in the ones that interest you most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 dark:from-primary-dark dark:to-primary-dark/90 dark:hover:from-primary-dark/90 dark:hover:to-primary-dark/80 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Browse Courses
                </button>
              </Link>
              <Link href="/about">
                <button className="border-2 border-primary dark:border-primary-dark text-primary dark:text-primary-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-white dark:hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Certificates</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;

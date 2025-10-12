"use client";
import CourseAccessSection from "@/src/components/features/course/CourseAccessSection";
import { useGetCourseWithContentQuery } from "@/src/redux/features/course/courseApi";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const { data: course } = useGetCourseWithContentQuery(id as string);
  console.log(course);
  return (
    <div className="">
      <CourseAccessSection course={course?.course} />
    </div>
  );
};

export default page;

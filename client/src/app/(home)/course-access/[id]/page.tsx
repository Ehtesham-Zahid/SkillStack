"use client";
import CourseAccessSection from "@/src/components/features/course/CourseAccessSection";
import { useGetCourseWithContentQuery } from "@/src/redux/features/course/courseApi";
import { useParams } from "next/navigation";
import Spinner from "@/src/components/ui/Spinner";

const page = () => {
  const { id } = useParams();
  const { data: course, isLoading } = useGetCourseWithContentQuery(
    id as string
  );
  console.log(course);
  return (
    <div className="">
      {isLoading ? (
        <Spinner />
      ) : (
        <CourseAccessSection course={course?.course} />
      )}
    </div>
  );
};

export default page;

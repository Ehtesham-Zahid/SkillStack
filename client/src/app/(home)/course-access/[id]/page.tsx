"use client";
import CourseAccessSection from "@/src/components/features/course/CourseAccessSection";
import { useGetCourseWithContentQuery } from "@/src/redux/features/course/courseApi";
import { useParams } from "next/navigation";
import Spinner from "@/src/components/ui/Spinner";
import { useEffect } from "react";
import { useLoadUserQuery } from "@/src/redux/features/api/apiSlice";
import { redirect } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const { data: course, isLoading } = useGetCourseWithContentQuery(
    id as string
  );

  const { data: user } = useLoadUserQuery({});
  console.log(user);

  useEffect(() => {
    if (
      user?.user?.courses?.find(
        (course: any) => course.courseId.toString() === (id as string)
      )
    ) {
      console.log("User has access to this course");
    } else {
      redirect("/");
    }
  }, [user, id]);

  console.log(course);
  return (
    <div className="">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <CourseAccessSection course={course?.course} user={user?.user} />
        </>
      )}
    </div>
  );
};

export default page;

"use client";
import CourseAccessSection from "@/src/components/features/course/CourseAccessSection";
import { useGetCourseWithContentQuery } from "@/src/redux/features/course/courseApi";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/src/components/ui/Spinner";
import { useEffect } from "react";
import { useLoadUserQuery } from "@/src/redux/features/api/apiSlice";

const page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data: course, isLoading } = useGetCourseWithContentQuery(
    id as string
  );

  const { data: user, isLoading: isUserLoading } = useLoadUserQuery(
    undefined,
    {}
  );
  console.log(user);

  useEffect(() => {
    if (isUserLoading || !user) return;

    const hasAccess = user?.user?.courses?.some(
      (course: any) => course.courseId.toString() === id
    );

    if (!hasAccess) {
      // Add a small timeout to ensure refetch has completed
      setTimeout(() => router.push("/"), 300);
    }
  }, [user, id, isUserLoading]);

  return (
    <div className="">
      {isLoading || isUserLoading ? (
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

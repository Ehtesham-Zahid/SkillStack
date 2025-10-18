"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/src/utils/Heading";
import { useLoadUserQuery } from "@/src/redux/features/api/apiSlice";
import { useGetCourseWithContentQuery } from "@/src/redux/features/course/courseApi";
import Spinner from "@/src/components/ui/Spinner";
import CourseAccessSection from "@/src/components/features/course/CourseAccessSection";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: course, isLoading: isCourseLoading } =
    useGetCourseWithContentQuery(id as string);

  const { data: user, isLoading: isUserLoading } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [authorizedChecked, setAuthorizedChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isUserLoading || isCourseLoading) return;

    // not logged in
    if (!user?.user) {
      router.push("/");
      return;
    }

    // check access
    const hasAccess = user.user.courses?.some(
      (c: any) => c.courseId.toString() === id
    );

    if (!hasAccess) {
      router.push("/");
      return;
    }

    // if reached here, authorized
    setIsAuthorized(true);
    setAuthorizedChecked(true);
  }, [user, id, isUserLoading, isCourseLoading, router]);

  // while checking authorization or loading data
  if (!authorizedChecked || isUserLoading || isCourseLoading) {
    return <Spinner />;
  }

  // only render when authorized
  if (!isAuthorized) return null;

  return (
    <>
      <Heading
        title={`SkillStack | Learning - ${course?.course?.name || "Course"}`}
        description={`Continue learning ${
          course?.course?.name || "this course"
        } with SkillStack - Access course materials, videos, and track your progress`}
        keywords={`${
          course?.course?.name || "Course"
        }, Learning, Course Access, SkillStack, Online Learning, Study, Education`}
      />
      <div>
        <CourseAccessSection course={course?.course} user={user?.user} />
      </div>
    </>
  );
};

export default Page;

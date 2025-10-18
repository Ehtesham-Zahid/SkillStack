import { Suspense } from "react";
import Heading from "@/src/utils/Heading";
import CoursesSection from "@/src/components/features/course/CoursesSection";
import Spinner from "@/src/components/ui/Spinner";

export default function Page() {
  return (
    <>
      <Heading
        title="SkillStack | All Courses"
        description="Browse our comprehensive collection of programming, web development, AI, and data science courses"
        keywords="Online Courses, Programming Courses, Web Development, AI Courses, Data Science, Coding Bootcamp, Learn Programming"
      />
      <Suspense fallback={<Spinner />}>
        <CoursesSection />
      </Suspense>
    </>
  );
}

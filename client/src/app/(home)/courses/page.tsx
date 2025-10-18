import { Suspense } from "react";
import CoursesSection from "@/src/components/features/course/CoursesSection";
import Spinner from "@/src/components/ui/Spinner";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <CoursesSection />
    </Suspense>
  );
}

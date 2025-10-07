import CourseCard from "@/src/components/features/course/CourseCard";
import Link from "next/link";
import { Button } from "@/src/shadcn/ui/button";

const HomeCoursesSection = () => {
  return (
    <section className="overflow-hidden py-16 w-11/12  lg:w-11/12 2xl:w-5/6 mx-auto">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text1 dark:text-text1-dark">
          Level Up Your{" "}
          <span className="text-primary dark:text-primary-dark ">Skills</span>{" "}
          With
          <br /> Expert‑Led Courses
        </h2>
        <p className="mt-4 text-text2 dark:text-text2-dark">
          Discover world-class courses designed to help you learn new skills and
          advance your career with expert instructors.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <CourseCard
          title="HTML for Programmers: Build Your Web Basics Right"
          author="Ahad Ali"
          price={29}
          students={3}
          lessons={1}
          rating={5}
          accent="primary"
          thumbnailSrc="/images/course-thumbnail.webp"
        />
        <CourseCard
          title="CSS for Programmers: Style the Web Like a Pro"
          author="Ahad Ali"
          price={49}
          students={3}
          lessons={1}
          rating={0}
          accent="accent"
          thumbnailSrc="/images/course-thumbnail.webp"
        />
        <CourseCard
          title="JavaScript for Programmers: From Fundamentals to Real Projects"
          author="Ahad Ali"
          price={99}
          students={2}
          lessons={1}
          rating={0}
          accent="success"
          thumbnailSrc="/images/course-thumbnail.webp"
        />
      </div>
      <div className="mt-8 flex justify-center px-4">
        <Link href="/courses">
          <Button className="cursor-pointer px-6 py-5 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90">
            View All Courses
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HomeCoursesSection;

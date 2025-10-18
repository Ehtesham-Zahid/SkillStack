import CourseCard from "@/src/components/features/course/CourseCard";
import Link from "next/link";
import { Button } from "@/src/shadcn/ui/button";
import { useGetAllCoursesQuery } from "@/src/redux/features/course/courseApi";
import Spinner from "../../ui/Spinner";

const HomeCoursesSection = () => {
  const { data, isLoading, isFetching } = useGetAllCoursesQuery();
  const countTotalCourseLessons = (course: any) => {
    return (
      course?.sections?.reduce(
        (acc: number, section: any) => acc + (section?.lessons?.length || 0),
        0
      ) || 0
    );
  };
  return isLoading ? (
    <div className="flex justify-center items-center h-full w-full my-20">
      <Spinner fullPage={false} />
    </div>
  ) : (
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
        {data?.courses?.slice(0, 3).map((course: any) => (
          <CourseCard
            key={course._id}
            id={course._id}
            title={course.name}
            author={"Ehtesham Zahid"}
            price={course.price}
            students={course.purchased}
            lessons={countTotalCourseLessons(course)}
            rating={course.ratings}
            accent="primary"
            thumbnailSrc={course.thumbnail.url}
            // authorAvatarSrc={course.instructor.avatar}
            enrolled={false}
            discountedPrice={course?.discountedPrice}
          />
        ))}
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

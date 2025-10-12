"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/shadcn/ui/button";
import { Input } from "@/src/shadcn/ui/input";
import { Search, Filter } from "lucide-react";
import CourseCard from "./CourseCard";
import { useGetLayoutByTypeQuery } from "@/src/redux/features/layout/layoutApi";
import { useGetAllCoursesQuery } from "@/src/redux/features/course/courseApi";
import Spinner from "@/src/components/ui/Spinner";

const CoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetLayoutByTypeQuery({ type: "Categories" });

  const { data: coursesData, isLoading: coursesLoading } =
    useGetAllCoursesQuery();

  console.log("coursesData", coursesData);

  console.log("categoriesData", categoriesData);

  // Create categories array with "All" category at the start
  const categories = categoriesData?.layout?.categories
    ? [
        { id: "all", title: "All" },
        ...categoriesData.layout.categories.map((category: any) => ({
          id: category._id,
          title: category.title,
        })),
      ]
    : [{ id: "all", title: "All" }];

  console.log("categories", categories);

  // Filter courses based on category and search query
  const filteredCourses = coursesData?.courses.filter((course: any) => {
    const matchesCategory =
      activeCategory === "All" ||
      course.category === activeCategory.toLowerCase().replace(" ", "");
    const matchesSearch = course.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {coursesLoading ? (
        <Spinner />
      ) : coursesData?.courses.length > 0 ? (
        <section className="overflow-hidden py-16 w-11/12 lg:w-11/12 2xl:w-5/6 mx-auto">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-[clamp(28px,5vw,52px)] font-extrabold tracking-tight text-text1 dark:text-text1-dark">
              Explore Our{" "}
              <span className="text-primary dark:text-primary-dark">
                Courses
              </span>
            </h1>
            <p className="mt-4 text-text2 dark:text-text2-dark text-base sm:text-lg">
              Find the perfect course to boost your skills and career. Browse by
              category or search by title.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mt-12 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Search Bar */}
              <div className="relative w-full max-w-md mx-auto mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text2 dark:text-text2-dark" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-surface dark:bg-surface-dark border border-text2 dark:border-text2-dark text-text1 dark:text-text1-dark placeholder:text-text2 dark:placeholder:text-text2-dark focus:border-primary dark:focus:border-primary-dark rounded-lg text-base transition-colors duration-200"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-2 text-text2 dark:text-text2-dark">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filter by:</span>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category: any) => (
                    <Button
                      key={category.id}
                      onClick={() => setActiveCategory(category.title)}
                      variant={
                        activeCategory === category.title
                          ? "default"
                          : "outline"
                      }
                      className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                        activeCategory === category.title
                          ? "bg-primary text-white hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90"
                          : "bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark text-text1 dark:text-text1-dark hover:bg-surface/80 dark:hover:bg-surface-dark/80 hover:border-primary/50 dark:hover:border-primary-dark/50"
                      }`}
                    >
                      {category.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-8 px-4">
            <div className=" mx-auto">
              <p className="text-text2 dark:text-text2-dark text-sm">
                Showing {filteredCourses?.length} of{" "}
                {coursesData?.courses.length} courses
                {activeCategory !== "All" && ` in ${activeCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4   mx-auto">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course: any) => (
                <CourseCard
                  key={course._id}
                  id={course._id}
                  title={course.name}
                  author={"Ehtesham Zahid"}
                  price={course.price}
                  students={course.purchased}
                  lessons={course.sections.length}
                  rating={course.ratings}
                  accent={"primary"}
                  thumbnailSrc={course.thumbnail.url}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-text2 dark:text-text2-dark">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">
                    No courses found
                  </h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        coursesData?.courses.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="text-text2 dark:text-text2-dark">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default CoursesSection;

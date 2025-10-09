"use client";

import { useState } from "react";
import { Button } from "@/src/shadcn/ui/button";
import { Input } from "@/src/shadcn/ui/input";
import { Search, Filter } from "lucide-react";
import CourseCard from "./CourseCard";
import { useGetLayoutByTypeQuery } from "@/src/redux/features/layout/layoutApi";

const CoursesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetLayoutByTypeQuery({ type: "Categories" });

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

  // Dummy courses data
  const courses = [
    {
      id: 1,
      title: "HTML for Programmers: Build Your Web Basics Right",
      author: "Ahad Ali",
      price: 29,
      students: 3,
      lessons: 1,
      rating: 5,
      accent: "primary" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user3.jpg",
      category: "web",
    },
    {
      id: 2,
      title: "CSS for Programmers: Style the Web Like a Pro",
      author: "Ahad Ali",
      price: 49,
      students: 3,
      lessons: 1,
      rating: 0,
      accent: "accent" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user3.jpg",
      category: "web",
    },
    {
      id: 3,
      title: "JavaScript for Programmers: From Fundamentals to Real Projects",
      author: "Ahad Ali",
      price: 99,
      students: 2,
      lessons: 1,
      rating: 0,
      accent: "success" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user3.jpg",
      category: "web",
    },
    {
      id: 4,
      title: "React Mastery: Building Modern Web Applications",
      author: "Sarah Johnson",
      price: 79,
      students: 15,
      lessons: 8,
      rating: 4.8,
      accent: "primary" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user.webp",
      category: "web",
    },
    {
      id: 5,
      title: "Node.js Backend Development: Complete Guide",
      author: "Mike Chen",
      price: 89,
      students: 12,
      lessons: 6,
      rating: 4.6,
      accent: "accent" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user2.png",
      category: "web",
    },
    {
      id: 6,
      title: "React Native Mobile App Development",
      author: "Emily Rodriguez",
      price: 119,
      students: 8,
      lessons: 10,
      rating: 4.9,
      accent: "success" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user3.jpg",
      category: "app",
    },
    {
      id: 7,
      title: "Flutter Cross-Platform Development",
      author: "David Kim",
      price: 95,
      students: 6,
      lessons: 7,
      rating: 4.7,
      accent: "primary" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user.webp",
      category: "app",
    },
    {
      id: 8,
      title: "iOS App Development with Swift",
      author: "Lisa Wang",
      price: 129,
      students: 4,
      lessons: 12,
      rating: 5.0,
      accent: "accent" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user2.png",
      category: "app",
    },
    {
      id: 9,
      title: "Android Development with Kotlin",
      author: "James Wilson",
      price: 109,
      students: 7,
      lessons: 9,
      rating: 4.5,
      accent: "success" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user3.jpg",
      category: "app",
    },
    {
      id: 10,
      title: "Electron Desktop App Development",
      author: "Anna Thompson",
      price: 85,
      students: 5,
      lessons: 5,
      rating: 4.3,
      accent: "primary" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user.webp",
      category: "desktop",
    },
    {
      id: 11,
      title: "Python Desktop Applications with Tkinter",
      author: "Robert Brown",
      price: 65,
      students: 9,
      lessons: 4,
      rating: 4.4,
      accent: "accent" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user2.png",
      category: "desktop",
    },
    {
      id: 12,
      title: "C# Windows Forms Development",
      author: "Jennifer Davis",
      price: 75,
      students: 3,
      lessons: 6,
      rating: 4.2,
      accent: "success" as const,
      thumbnailSrc: "/images/course-thumbnail.webp",
      authorAvatarSrc: "/images/user3.jpg",
      category: "desktop",
    },
  ];

  // Filter courses based on category and search query
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      activeCategory === "All" ||
      course.category === activeCategory.toLowerCase().replace(" ", "");
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="overflow-hidden py-16 w-11/12 lg:w-11/12 2xl:w-5/6 mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-[clamp(28px,5vw,52px)] font-extrabold tracking-tight text-text1 dark:text-text1-dark">
          Explore Our{" "}
          <span className="text-primary dark:text-primary-dark">Courses</span>
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
                    activeCategory === category.title ? "default" : "outline"
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
        <div className="max-w-6xl mx-auto">
          <p className="text-text2 dark:text-text2-dark text-sm">
            Showing {filteredCourses.length} of {courses.length} courses
            {activeCategory !== "All" && ` in ${activeCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              author={course.author}
              price={course.price}
              students={course.students}
              lessons={course.lessons}
              rating={course.rating}
              accent={course.accent}
              thumbnailSrc={course.thumbnailSrc}
              authorAvatarSrc={course.authorAvatarSrc}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-text2 dark:text-text2-dark">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </div>

      {/* Load More Button (for future pagination) */}
      {filteredCourses.length > 0 && filteredCourses.length >= 12 && (
        <div className="mt-12 flex justify-center px-4">
          <Button className="px-8 py-3 text-base font-semibold bg-primary text-white hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90">
            Load More Courses
          </Button>
        </div>
      )}
    </section>
  );
};

export default CoursesSection;

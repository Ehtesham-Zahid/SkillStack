import React from "react";
import { Card, CardContent } from "@/src/shadcn/ui/card";
import { Button } from "@/src/shadcn/ui/button";
import { Badge } from "@/src/shadcn/ui/badge";
import {
  CheckCircle2,
  Play,
  Star,
  Users,
  Clock,
  Award,
  Code,
  User,
  Headphones,
  FileText,
  ChevronDown,
  ChevronUp,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const SingleCourseSection = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "html-mastery"
  );

  // Dummy course data matching the image
  const course = {
    id: 1,
    title: "HTML for Programmers: Build Your Web Basics Right",
    instructor: "Ahad Ali",
    rating: 5.0,
    reviewCount: 2,
    students: 3,
    level: "Beginner",
    price: 29,
    originalPrice: 79,
    discount: 63,
    duration: "3 minutes",
    lessons: 1,
    description:
      "HTML is where the web begins. This course is your hands-on guide to writing clean, structured, and developer-friendly HTML. No more guesswork — just practical, real-world usage explained in simple terms.",
    longDescription:
      "Made for programmers, not just designers. Whether you're a complete beginner or a backend dev transitioning to frontend, this course focuses on how developers actually use HTML in real projects.",
    thumbnail: "/images/course-thumbnail.webp",
    instructorAvatar: "/images/user3.jpg",
  };

  const learningObjectives = [
    "You'll be able to build a full-stack LMS platform from scratch, starting with clean and semantic HTML structure",
    "You'll develop the confidence to build real-world web layouts without relying on templates or frameworks",
  ];

  const prerequisites = [
    "Basic understanding of how the web works (like browsers, websites, and servers)",
    "Comfort with basic computer skills (like creating files, folders, and navigating directories)",
  ];

  const courseModules = [
    {
      id: "html-mastery",
      title: "HTML Mastery",
      lessons: 1,
      duration: "3 minutes",
      isExpanded: expandedSection === "html-mastery",
      topics: [{ title: "Complete Guide to HTML", duration: "3 minutes" }],
    },
  ];

  const courseDetails = [
    "What each tag really does — and when to use it",
    "How to structure pages semantically for better readability and SEO",
    "How to use forms, tables, media, and links the right way",
  ];

  const reviews = [
    {
      id: 1,
      name: "Sameer Malik",
      avatar: "/images/user.webp",
      rating: 5,
      date: "2 months ago",
      comment: "I am getting better at java thanks to this.",
    },
    {
      id: 2,
      name: "Ahad Ali",
      avatar: "/images/user2.png",
      rating: 5,
      date: "2 months ago",
      comment: "This was a good course.",
    },
    {
      id: 3,
      name: "Abdul Ahad",
      avatar: "/images/user3.jpg",
      rating: 5,
      date: "2 months ago",
      comment: "Great course structure and easy to follow along.",
    },
  ];

  const courseFeatures = [
    { icon: Code, text: "Source code included" },
    { icon: Award, text: "Full lifetime access" },
    { icon: FileText, text: "Certificate of completion" },
    { icon: Headphones, text: "Premium support" },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="w-11/12 lg:w-11/12 2xl:w-5/6 mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-text1 dark:text-text1-dark leading-tight">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-text1 dark:text-text1-dark">
                    {course.rating}
                  </span>
                  <span className="text-text2 dark:text-text2-dark">
                    ({course.reviewCount} Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-text2 dark:text-text2-dark">
                  <Users className="h-4 w-4" />
                  <span>{course.students} Students</span>
                </div>

                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary dark:text-primary-dark px-3 py-1 text-sm font-medium"
                >
                  {course.level}
                </Badge>
              </div>
            </div>

            {/* What you'll learn */}
            <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
              <CardContent className="px-8 py-4">
                <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark mb-6">
                  What you'll learn
                </h3>
                <div className="space-y-4">
                  {learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-text2 dark:text-text2-dark text-base leading-relaxed">
                        {objective}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
              <CardContent className="px-8 py-4">
                <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark mb-6">
                  Prerequisites
                </h3>
                <div className="space-y-4">
                  {prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-text2 dark:text-text2-dark text-base leading-relaxed">
                        {prerequisite}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Overview */}
            <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark mb-6">
                  Course Overview
                </h3>
                <div className="space-y-4">
                  {courseModules.map((module) => (
                    <div
                      key={module.id}
                      className="border border-text2/30 dark:border-text2-dark/30 rounded-xl overflow-hidden bg-surface/30 dark:bg-surface-dark/30 hover:bg-surface/50 dark:hover:bg-surface-dark/50 transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleSection(module.id)}
                        className="w-full p-6 flex items-center justify-between hover:bg-primary/5 dark:hover:bg-primary-dark/5 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary-dark/20 transition-colors">
                            {module.isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-primary dark:text-primary-dark" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-primary dark:text-primary-dark" />
                            )}
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-text1 dark:text-text1-dark text-lg group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                              {module.title}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center gap-1 text-text2 dark:text-text2-dark text-sm">
                                <FileText className="h-4 w-4" />
                                <span>{module.lessons} Lessons</span>
                              </div>
                              <div className="flex items-center gap-1 text-text2 dark:text-text2-dark text-sm">
                                <Clock className="h-4 w-4" />
                                <span>{module.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary dark:text-primary-dark"
                          >
                            {module.lessons} Lesson
                            {module.lessons > 1 ? "s" : ""}
                          </Badge>
                        </div>
                      </button>

                      {module.isExpanded && (
                        <div className="border-t border-text2/20 dark:border-text2-dark/20 bg-surface/20 dark:bg-surface-dark/20">
                          <div className="p-6 space-y-3">
                            <div className="text-sm text-text2 dark:text-text2-dark font-medium mb-3">
                              Course Content:
                            </div>
                            {module.topics.map((topic, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-4 p-4 bg-surface dark:bg-surface-dark rounded-lg border border-text2/20 dark:border-text2-dark/20 hover:border-primary/30 dark:hover:border-primary-dark/30 transition-colors group"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary-dark/20 transition-colors">
                                  <Play className="h-4 w-4 text-primary dark:text-primary-dark" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-text1 dark:text-text1-dark font-semibold group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                                    {topic.title}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 text-text2 dark:text-text2-dark text-sm">
                                  <Clock className="h-3 w-3" />
                                  <span>{topic.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
              <CardContent className="px-8 py-4">
                <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark mb-6">
                  Course Details
                </h3>
                <div className="space-y-6 text-text2 dark:text-text2-dark text-base leading-relaxed">
                  <p>{course.description}</p>
                  <p>{course.longDescription}</p>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-text1 dark:text-text1-dark text-lg">
                      What you'll learn:
                    </h4>
                    <div className="space-y-3">
                      {courseDetails.map((detail, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="h-2 w-2 bg-primary dark:bg-primary-dark rounded-full mt-3 flex-shrink-0" />
                          <p>{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <UserCheck className="h-5 w-5 text-primary dark:text-primary-dark mt-1 flex-shrink-0" />
                    <p>
                      Mini projects and coding challenges to reinforce every
                      concept
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <UserCheck className="h-5 w-5 text-primary dark:text-primary-dark mt-1 flex-shrink-0" />
                    <p>By the end...</p>
                  </div>

                  <p>
                    You won't just know HTML — you'll be writing
                    production-level code, ready for CSS, JavaScript, and any
                    modern frontend stack. It's your first real step into the
                    world of web development.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
              <CardContent className="p-8">
                {/* Reviews Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark">
                      Reviews
                    </h3>
                    <p className="text-text2 dark:text-text2-dark">
                      {course.rating} Course Rating • {course.reviewCount}{" "}
                      Reviews
                    </p>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex gap-4 pb-6 border-b border-text2/20 dark:border-text2-dark/20 last:border-b-0 last:pb-0"
                    >
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={50}
                        height={50}
                        className="rounded-full w-12 h-12 object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-text1 dark:text-text1-dark">
                            {review.name}
                          </h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-text2 dark:text-text2-dark text-sm">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-text2 dark:text-text2-dark leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Video Player */}
              <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-base opacity-75">
                        Error 2063 Trial exceeded
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary-dark/5 dark:to-primary-dark/10 border-primary/20 dark:border-primary-dark/20 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    {/* Price Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-5xl font-black text-text1 dark:text-text1-dark">
                          ${course.price}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className="text-lg text-text2 dark:text-text2-dark line-through">
                            ${course.originalPrice}
                          </span>
                          <Badge
                            variant="destructive"
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-sm font-bold shadow-md"
                          >
                            {course.discount}% OFF
                          </Badge>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-text2 dark:text-text2-dark text-sm">
                          One-time payment • Lifetime access
                        </p>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 dark:from-primary-dark dark:to-primary-dark/80 dark:hover:from-primary-dark/90 dark:hover:to-primary-dark/70 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      Buy Now
                    </Button>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <div className="flex items-center gap-1 text-text2 dark:text-text2-dark text-xs">
                        <Award className="h-3 w-3" />
                        <span>30-day guarantee</span>
                      </div>
                      <div className="w-1 h-1 bg-text2/30 dark:bg-text2-dark/30 rounded-full"></div>
                      <div className="flex items-center gap-1 text-text2 dark:text-text2-dark text-xs">
                        <Headphones className="h-3 w-3" />
                        <span>Support included</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Features */}
              <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
                <CardContent className="px-8 py-4   ">
                  <h3 className="text-xl font-bold text-text1 dark:text-text1-dark mb-6">
                    This course includes:
                  </h3>
                  <div className="space-y-4">
                    {courseFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <feature.icon className="h-6 w-6 text-green-500" />
                        <span className="text-text2 dark:text-text2-dark text-base font-medium">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseSection;

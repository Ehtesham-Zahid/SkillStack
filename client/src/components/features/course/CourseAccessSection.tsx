"use client";

import React, { useState } from "react";
import { Button } from "@/src/shadcn/ui/button";
import { Card, CardContent } from "@/src/shadcn/ui/card";
import { Badge } from "@/src/shadcn/ui/badge";
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Star,
  MessageCircle,
  FileText,
  Download,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import CoursePlayer from "@/src/components/shared/CoursePlayer";
import { cn } from "@/lib/utils";

// Dummy data
const courseData = {
  id: "1",
  title: "Complete Guide to CSS",
  description:
    "Ready to go from plain layouts to polished, responsive designs? In this video, we'll introduce you to CSS (Cascading Style Sheets) — the styling language that brings your HTML to life.",
  instructor: "John Doe",
  rating: 4.8,
  totalStudents: 1250,
  duration: "3 hours 45 minutes",
  lessons: [
    {
      id: "1",
      title: "CSS Mastery",
      sections: [
        {
          id: "s1",
          title: "CSS Mastery",
          lessons: [
            {
              id: "l1",
              title: "Complete Guide to CSS",
              duration: "3 minutes",
              type: "video",
              isCompleted: false,
              isLocked: false,
              videoUrl: "https://example.com/video1.mp4",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "Getting Started",
      sections: [
        {
          id: "s2",
          title: "Getting Started",
          lessons: [
            {
              id: "l2",
              title: "What is AI?",
              duration: "3 minutes",
              type: "video",
              isCompleted: true,
              isLocked: false,
              videoUrl: "https://example.com/video2.mp4",
            },
            {
              id: "l3",
              title: "Applications of AI",
              duration: "5 minutes",
              type: "video",
              isCompleted: false,
              isLocked: false,
              videoUrl: "https://example.com/video3.mp4",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Machine Learning Basics",
      sections: [
        {
          id: "s3",
          title: "Machine Learning Basics",
          lessons: [
            {
              id: "l4",
              title: "Introduction to Machine Learning",
              duration: "7 minutes",
              type: "video",
              isCompleted: false,
              isLocked: false,
              videoUrl: "https://example.com/video4.mp4",
            },
          ],
        },
      ],
    },
    {
      id: "4",
      title: "Deep Learning",
      sections: [
        {
          id: "s4",
          title: "Deep Learning",
          lessons: [
            {
              id: "l5",
              title: "Neural Networks Introduction",
              duration: "4 minutes",
              type: "video",
              isCompleted: false,
              isLocked: false,
              videoUrl: "https://example.com/video5.mp4",
            },
          ],
        },
      ],
    },
  ],
};

const CourseAccessSection = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentLesson, setCurrentLesson] = useState("l3");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "s1",
    "s2",
    "s3",
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [questionText, setQuestionText] = useState("");

  // Dummy reviews data
  const [reviews, setReviews] = useState([
    {
      id: "1",
      user: "Sarah Johnson",
      rating: 5,
      text: "Excellent course! The explanations are clear and the examples are practical.",
      date: "2 days ago",
    },
    {
      id: "2",
      user: "Mike Chen",
      rating: 4,
      text: "Great content and well-structured lessons. Would recommend to anyone learning CSS.",
      date: "1 week ago",
    },
    {
      id: "3",
      user: "Emily Davis",
      rating: 5,
      text: "Perfect for beginners. The instructor explains everything step by step.",
      date: "2 weeks ago",
    },
  ]);

  // Dummy Q&A data
  const [questions, setQuestions] = useState([
    {
      id: "1",
      user: "Alex Thompson",
      question: "What is the difference between CSS Grid and Flexbox?",
      answer:
        "CSS Grid is a two-dimensional layout system that works with rows and columns, while Flexbox is a one-dimensional layout system that works with either rows or columns.",
      answeredBy: "John Doe (Instructor)",
      date: "3 days ago",
      answeredDate: "2 days ago",
    },
    {
      id: "2",
      user: "Maria Garcia",
      question: "Can you explain the box model in more detail?",
      answer:
        "The CSS box model consists of content, padding, border, and margin. Content is the actual content of the element, padding is the space between content and border, border is the edge of the element, and margin is the space outside the border.",
      answeredBy: "John Doe (Instructor)",
      date: "1 week ago",
      answeredDate: "1 week ago",
    },
    {
      id: "3",
      user: "David Kim",
      question: "What's the best way to center a div?",
      date: "2 days ago",
    },
  ]);

  const handleSubmitQuestion = () => {
    if (questionText.trim()) {
      const newQuestion = {
        id: Date.now().toString(),
        user: "You",
        question: questionText.trim(),
        date: "Just now",
      };
      setQuestions([newQuestion, ...questions]);
      setQuestionText("");
    }
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && userRating > 0) {
      const newReview = {
        id: Date.now().toString(),
        user: "You",
        rating: userRating,
        text: reviewText.trim(),
        date: "Just now",
      };
      setReviews([newReview, ...reviews]);
      setReviewText("");
      setUserRating(0);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "resources", label: "Resources", icon: Download },
    { id: "qa", label: "Q&A", icon: MessageCircle },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getCurrentLessonData = () => {
    for (const lesson of courseData.lessons) {
      for (const section of lesson.sections) {
        const found = section.lessons.find((l) => l.id === currentLesson);
        if (found) return found;
      }
    }
    return null;
  };

  const getCurrentSectionData = () => {
    for (const lesson of courseData.lessons) {
      for (const section of lesson.sections) {
        const found = section.lessons.find((l) => l.id === currentLesson);
        if (found) return section;
      }
    }
    return null;
  };

  const currentLessonData = getCurrentLessonData();
  const currentSectionData = getCurrentSectionData();

  const totalLessons = courseData.lessons.reduce(
    (total, lesson) =>
      total +
      lesson.sections.reduce(
        (sectionTotal, section) => sectionTotal + section.lessons.length,
        0
      ),
    0
  );

  const completedLessons = courseData.lessons.reduce(
    (total, lesson) =>
      total +
      lesson.sections.reduce(
        (sectionTotal, section) =>
          sectionTotal + section.lessons.filter((l) => l.isCompleted).length,
        0
      ),
    0
  );

  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark w-11/12 lg:w-11/12 2xl:w-5/6 mx-auto">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row  gap-6">
        {/* Left Content Area */}
        <div className="flex-1 py-4 lg:py-6">
          {/* Video Player Section */}
          <div className="mb-6">
            <div className="relative aspect-video bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
              {currentLessonData ? (
                <CoursePlayer
                  videoUrl={currentLessonData.videoUrl}
                  title={currentLessonData.title}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-2">Error 2063</div>
                    <div className="text-lg">Trial exceeded</div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev Lesson</span>
              </Button>
              <Button className="flex items-center space-x-2 bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90">
                <span>Next Lesson</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Course Details */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLessonData?.title || courseData.title}
              </h1>

              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-white dark:bg-gray-600 text-primary dark:text-primary-dark shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {activeTab === "overview" && (
                  <div>
                    <p className="mb-4">{courseData.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-primary dark:text-primary-dark" />
                        <span className="text-sm">{courseData.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5 text-primary dark:text-primary-dark" />
                        <span className="text-sm">{totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-primary dark:text-primary-dark" />
                        <span className="text-sm">
                          {courseData.rating} ({courseData.totalStudents}{" "}
                          students)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Course Resources
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-primary dark:text-primary-dark" />
                          <span>CSS Cheat Sheet.pdf</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-primary dark:text-primary-dark" />
                          <span>Code Examples.zip</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "qa" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                      Questions & Answers
                    </h3>

                    {/* Ask Question Section */}
                    <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                        Ask a Question
                      </h4>

                      {/* Question Input */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Question
                        </label>
                        <textarea
                          value={questionText}
                          onChange={(e) => setQuestionText(e.target.value)}
                          placeholder="What would you like to know about this course?"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmitQuestion}
                        disabled={!questionText.trim()}
                        className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Ask Question
                      </Button>
                    </div>

                    {/* Q&A Threads */}
                    <div className="space-y-4">
                      {questions.map((qa) => (
                        <div
                          key={qa.id}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          {/* Question */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {qa.user}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {qa.date}
                              </span>
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              {qa.question}
                            </h4>
                          </div>

                          {/* Answer */}
                          {qa.answer ? (
                            <div className="pl-4 border-l-2 border-orange-500 bg-orange-50 dark:bg-orange-500/10 p-3 rounded-r-md">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                                  {qa.answeredBy}
                                </span>
                                <span className="text-xs text-orange-600 dark:text-orange-400">
                                  {qa.answeredDate}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {qa.answer}
                              </p>
                            </div>
                          ) : (
                            <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800/50 p-3 rounded-r-md">
                              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                                Waiting for instructor response...
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                      Student Reviews
                    </h3>

                    {/* Add Review Section */}
                    <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                        Write a Review
                      </h4>

                      {/* Rating */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Rating
                        </label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setUserRating(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 transition-colors ${
                                  star <= userRating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600 hover:text-yellow-400"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Review
                        </label>
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your thoughts about this course..."
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmitReview}
                        disabled={!reviewText.trim() || userRating === 0}
                        className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Review
                      </Button>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {review.user}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {review.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div
          className={cn(
            "w-full lg:w-[28rem]    transition-all duration-300",
            sidebarOpen ? "block" : "hidden lg:block"
          )}
        >
          {/* Lessons List */}
          <div className="overflow-y-auto max-h-[calc(100vh-120px)] p-4 space-y-3">
            {courseData.lessons.map((lesson) => (
              <div key={lesson.id}>
                {lesson.sections.map((section) => (
                  <div
                    key={section.id}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
                    >
                      <div className="text-left flex-1">
                        <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-1 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                          {section.title}
                        </h3>
                        <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center space-x-1">
                            <BookOpen className="h-3 w-3" />
                            <span>
                              {section.lessons.length} Lesson
                              {section.lessons.length !== 1 ? "s" : ""}
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {section.lessons.reduce(
                                (total, l) => total + parseInt(l.duration),
                                0
                              )}{" "}
                              min
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        {expandedSections.includes(section.id) ? (
                          <ChevronUp className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                        )}
                      </div>
                    </button>

                    {expandedSections.includes(section.id) && (
                      <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        {section.lessons.map((lessonItem) => (
                          <button
                            key={lessonItem.id}
                            onClick={() => setCurrentLesson(lessonItem.id)}
                            className={cn(
                              "w-full flex items-center space-x-3 p-3 transition-all duration-200 text-left group relative border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                              currentLesson === lessonItem.id
                                ? "bg-orange-50 dark:bg-orange-500/10 border-l-2 border-l-orange-500"
                                : "hover:bg-slate-100 dark:hover:bg-slate-700/50"
                            )}
                          >
                            <div className="flex-shrink-0 relative">
                              <div
                                className={cn(
                                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                                  currentLesson === lessonItem.id
                                    ? "bg-orange-500 text-white"
                                    : "bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-500"
                                )}
                              >
                                <Play
                                  className={cn(
                                    "h-4 w-4 ml-0.5 transition-colors",
                                    currentLesson === lessonItem.id
                                      ? "text-white"
                                      : "text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white"
                                  )}
                                />
                              </div>
                            </div>
                            <div
                              className={cn(
                                "flex-1 min-w-0 transition-all duration-200",
                                currentLesson === lessonItem.id
                                  ? "pr-28"
                                  : "pr-3"
                              )}
                            >
                              <p
                                className={cn(
                                  "text-sm font-medium transition-colors truncate",
                                  currentLesson === lessonItem.id
                                    ? "text-orange-600 dark:text-orange-400"
                                    : "text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200"
                                )}
                              >
                                {lessonItem.title}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{lessonItem.duration}</span>
                              </p>
                            </div>
                            {currentLesson === lessonItem.id && (
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                                <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full border-0 shadow-sm whitespace-nowrap">
                                  Currently Playing
                                </Badge>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAccessSection;

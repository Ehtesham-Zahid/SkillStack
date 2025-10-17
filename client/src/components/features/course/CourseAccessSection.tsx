"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/src/shadcn/ui/button";
import { Card, CardContent } from "@/src/shadcn/ui/card";
import { Badge } from "@/src/shadcn/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shadcn/ui/accordion";
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
  ExternalLink,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import CoursePlayer from "@/src/components/shared/CoursePlayer";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/src/shadcn/ui/avatar";
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
  useAddReviewMutation,
  useAddReplyToReviewMutation,
} from "@/src/redux/features/course/courseApi";
import { toast } from "react-hot-toast";
import { formatDate } from "@/src/utils/formatDate";
import socketIO from "socket.io-client";
import { useSelector } from "react-redux";
const ENDPOINT =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:5000";
const socketId = socketIO(ENDPOINT, {
  transports: ["websocket"],
});

const CourseAccessSection = ({ course, user }: { course: any; user: any }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentSection, setCurrentSection] = useState<any>(
    course?.sections[0]
  );
  const [currentLesson, setCurrentLesson] = useState<any>(
    course?.sections[0]?.lessons[0]
  );
  console.log(currentLesson);
  console.log(currentSection);
  console.log(course);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [reviewReplyText, setReviewReplyText] = useState<{
    [key: string]: string;
  }>({});
  const [showReplies, setShowReplies] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [showReplyInput, setShowReplyInput] = useState<{
    [key: string]: boolean;
  }>({});
  const [reviews, setReviews] = useState<any[]>(course?.reviews || []);

  const [
    addQuestion,
    {
      data: AddQuestionCourseData,
      isLoading: isAddingQuestion,
      isSuccess: isQuestionAdded,
      error: questionError,
    },
  ] = useAddQuestionMutation();
  const [
    addAnswer,
    {
      data: AddAnswerCourseData,
      isLoading: isAddingAnswer,
      isSuccess: isAnswerAdded,
      error: answerError,
    },
  ] = useAddAnswerMutation();

  const [
    addReview,
    {
      data: AddReviewCourseData,
      isLoading: isAddingReview,
      isSuccess: isReviewAdded,
      error: reviewError,
    },
  ] = useAddReviewMutation();

  const [
    addReplyToReview,
    {
      data: AddReplyToReviewData,
      isLoading: isAddingReviewReply,
      isSuccess: isReviewReplyAdded,
      error: reviewReplyError,
    },
  ] = useAddReplyToReviewMutation();

  useEffect(() => {
    if (isAnswerAdded) {
      setCurrentLesson(
        AddAnswerCourseData?.course?.sections
          .find((section: any) => section._id === currentSection._id)
          ?.lessons.find((lesson: any) => lesson._id === currentLesson._id)
      );
      setReplyText("");
      toast.success("Answer added successfully");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New Reply Received",
          message: `You have a new question reply in ${currentLesson?.title}`,
          userId: user?._id,
        });
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isAnswerAdded, answerError]);

  useEffect(() => {
    if (isQuestionAdded) {
      setCurrentLesson(
        AddQuestionCourseData?.course?.sections
          .find((section: any) => section._id === currentSection._id)
          ?.lessons.find((lesson: any) => lesson._id === currentLesson._id)
      );
      setQuestionText("");

      toast.success("Question added successfully");

      let lesson = AddQuestionCourseData?.course?.sections
        .find((section: any) => section._id === currentSection._id)
        ?.lessons.find((lesson: any) => lesson._id === currentLesson._id);

      socketId.emit("notification", {
        title: "New Question",
        message: `You have a new question in ${lesson?.title}`,
        userId: user?._id,
      });
    }
    if (questionError) {
      if ("data" in questionError) {
        const errorMessage = questionError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isQuestionAdded, questionError]);

  useEffect(() => {
    if (isReviewAdded) {
      setReviews(AddReviewCourseData?.course?.reviews || []);
      setReviewText("");
      setUserRating(0);
      toast.success("Review added successfully");
      socketId.emit("notification", {
        title: "New Review",
        message: `You have a new review in ${course?.name}`,
        userId: user?._id,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isReviewAdded, reviewError]);

  useEffect(() => {
    if (isReviewReplyAdded) {
      setReviews(AddReplyToReviewData?.course?.reviews || []);
      // clear text for the review that was replied to
      const repliedReviewId = AddReplyToReviewData?.course?.reviews?.find(
        (r: any) => (r.commentReplies || []).length > 0
      )?._id;
      if (repliedReviewId) {
        setReviewReplyText((prev) => ({ ...prev, [repliedReviewId]: "" }));
      }
      toast.success("Reply added successfully");
    }
    if (reviewReplyError) {
      if ("data" in reviewReplyError) {
        const errorMessage = reviewReplyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isReviewReplyAdded, reviewReplyError]);

  const handleSubmitQuestion = () => {
    if (questionText.trim()) {
      addQuestion({
        question: questionText.trim(),
        courseId: course._id,
        sectionId: currentSection._id,
        lessonId: currentLesson._id,
      });
    }
  };

  const handleSubmitAnswer = (questionId: string) => {
    if (replyText.trim()) {
      addAnswer({
        answer: replyText.trim(),
        courseId: course._id,
        sectionId: currentSection._id,
        lessonId: currentLesson._id,
        questionId: questionId,
      });
    }
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && userRating > 0) {
      addReview({
        review: reviewText.trim(),
        courseId: course._id,
        rating: userRating,
      });
    }
  };

  const handleSubmitReviewReply = (reviewId: string) => {
    const text = (reviewReplyText[reviewId] || "").trim();
    if (text) {
      addReplyToReview({
        comment: text,
        courseId: course._id,
        reviewId,
      });
    }
  };

  const toggleShowReplies = (questionId: string) => {
    setShowReplies((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleReplyInput = (questionId: string) => {
    setShowReplyInput((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "resources", label: "Resources", icon: Download },
    { id: "qa", label: "Q&A", icon: MessageCircle },
    { id: "reviews", label: "Reviews", icon: Star },
  ];

  useEffect(() => {
    setCurrentLesson(course?.sections[0]?.lessons[0]);
    setCurrentSection(course?.sections[0]);
  }, [course]);

  const handleNextLesson = () => {
    const currentSectionIndex = course?.sections.findIndex(
      (section: any) => section._id === currentSection._id
    );
    const currentLessonIndex = currentSection?.lessons.findIndex(
      (lesson: any) => lesson._id === currentLesson._id
    );

    if (currentLessonIndex < currentSection?.lessons.length - 1) {
      setCurrentLesson(
        course?.sections[currentSectionIndex]?.lessons[currentLessonIndex + 1]
      );
    } else {
      if (currentSectionIndex < course?.sections.length - 1) {
        setCurrentLesson(course?.sections[currentSectionIndex + 1]?.lessons[0]);
        setCurrentSection(course?.sections[currentSectionIndex + 1]);
      } else {
        toast.error("No more lessons in this course");
      }
    }
  };

  const handlePrevLesson = () => {
    const currentSectionIndex = course?.sections.findIndex(
      (section: any) => section._id === currentSection._id
    );
    const currentLessonIndex = currentSection?.lessons.findIndex(
      (lesson: any) => lesson._id === currentLesson._id
    );

    if (currentLessonIndex > 0) {
      setCurrentLesson(
        course?.sections[currentSectionIndex]?.lessons[currentLessonIndex - 1]
      );
    } else {
      if (currentSectionIndex > 0) {
        setCurrentLesson(
          course?.sections[currentSectionIndex - 1]?.lessons[
            course?.sections[currentSectionIndex - 1]?.lessons.length - 1
          ]
        );
        setCurrentSection(course?.sections[currentSectionIndex - 1]);
      } else {
        toast.error("No previous lessons in this course");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark w-11/12 lg:w-11/12 2xl:w-5/6 mx-auto">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row  gap-6">
        {/* Left Content Area */}
        <div className="flex-1 py-4 lg:py-6">
          {/* Video Player Section */}
          <div className="mb-6">
            <div className="relative aspect-video bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
              {currentLesson ? (
                <CoursePlayer
                  videoUrl={currentLesson.videoUrl}
                  title={currentLesson.title}
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
                onClick={handlePrevLesson}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev Lesson</span>
              </Button>
              <Button
                className="flex items-center space-x-2 bg-primary hover:bg-primary/90 dark:bg-primary-dark dark:hover:bg-primary-dark/90"
                onClick={handleNextLesson}
              >
                <span>Next Lesson</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Course Details */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentLesson?.title}
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
                    <p className="mb-4">{currentLesson?.description}</p>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Course Resources
                    </h3>
                    <div className="space-y-3">
                      {currentLesson?.links &&
                      currentLesson.links.length > 0 ? (
                        currentLesson.links.map((link: any) => (
                          <div
                            key={link._id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-primary dark:text-primary-dark" />
                              <span className="text-gray-900 dark:text-white">
                                {link.title}
                              </span>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => window.open(link.url, "_blank")}
                              className="border border-primary dark:border-primary-dark bg-transparent text-primary dark:text-primary-dark hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white cursor-pointer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            No resources available for this lesson...
                          </p>
                        </div>
                      )}
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
                        disabled={!questionText.trim() || isAddingQuestion}
                        className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isAddingQuestion ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          "Ask Question"
                        )}
                      </Button>
                    </div>

                    {/* Q&A Threads */}
                    <div className="space-y-4">
                      {currentLesson?.questions?.length > 0 ? (
                        currentLesson?.questions?.map((qa: any) => (
                          <div
                            key={qa._id}
                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            {/* Question */}
                            <div className="mb-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage
                                      src={
                                        qa?.user?.avatar?.url ||
                                        "/images/user.webp"
                                      }
                                      alt={qa?.user?.name || "User"}
                                    />
                                    <AvatarFallback>
                                      {qa?.user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {qa?.user?.name}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDate(qa?.createdAt)}
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                {qa?.question}
                              </h4>
                            </div>

                            {/* Replies Section */}
                            <div className="mt-3">
                              {qa?.questionReplies.length > 0 ? (
                                <div>
                                  <button
                                    onClick={() => toggleShowReplies(qa._id)}
                                    className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium mb-2 flex items-center space-x-1"
                                  >
                                    <span>
                                      {showReplies[qa._id] ? "Hide" : "Show"}{" "}
                                      replies ({qa.questionReplies.length})
                                    </span>
                                    <ChevronDown
                                      className={`h-3 w-3 transition-transform ${
                                        showReplies[qa._id] ? "rotate-180" : ""
                                      }`}
                                    />
                                  </button>

                                  {showReplies[qa._id] && (
                                    <div className="space-y-3">
                                      {qa.questionReplies.map(
                                        (reply: any, index: number) => (
                                          <div
                                            key={reply._id || index}
                                            className="pl-4 border-l-2 border-orange-500 bg-orange-50 dark:bg-orange-500/10 p-3 rounded-r-md"
                                          >
                                            <div className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-300">
                                                <Avatar className="w-7 h-7">
                                                  <AvatarImage
                                                    src={
                                                      reply?.user?.avatar
                                                        ?.url ||
                                                      "/images/user.webp"
                                                    }
                                                    alt={
                                                      reply?.user?.name ||
                                                      "Instructor"
                                                    }
                                                  />
                                                  <AvatarFallback>
                                                    {reply?.user?.name?.charAt(
                                                      0
                                                    ) || "I"}
                                                  </AvatarFallback>
                                                </Avatar>
                                                <span>
                                                  {reply?.user?.name ||
                                                    "Instructor"}
                                                </span>
                                                {reply?.user?.role ===
                                                  "admin" && (
                                                  <span className="text-xs text-orange-600 dark:text-orange-400">
                                                    <ShieldCheck className="h-4 w-4" />
                                                  </span>
                                                )}
                                              </div>

                                              <span className="text-xs text-orange-600 dark:text-orange-400">
                                                {formatDate(
                                                  reply?.createdAt || ""
                                                )}
                                              </span>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                              {reply?.answer}
                                            </p>
                                          </div>
                                        )
                                      )}

                                      {/* Add Reply Input */}
                                      <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800/50 p-3 rounded-r-md">
                                        <div className="mb-3">
                                          <textarea
                                            value={replyText}
                                            onChange={(e) =>
                                              setReplyText(e.target.value)
                                            }
                                            placeholder="Add a reply..."
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                            rows={2}
                                          />
                                        </div>
                                        <div className="flex space-x-2">
                                          <Button
                                            onClick={() =>
                                              handleSubmitAnswer(qa._id)
                                            }
                                            disabled={
                                              !replyText.trim() ||
                                              isAddingAnswer
                                            }
                                            size="sm"
                                            className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                          >
                                            {isAddingAnswer ? (
                                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            ) : (
                                              "Reply"
                                            )}
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="pl-4 border-l-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800/50 p-3 rounded-r-md">
                                  <p className="text-sm text-gray-500 dark:text-gray-400 italic mb-3">
                                    No replies yet...
                                  </p>
                                  {!showReplyInput[qa._id] ? (
                                    <button
                                      onClick={() => toggleReplyInput(qa._id)}
                                      className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium"
                                    >
                                      Add Reply
                                    </button>
                                  ) : (
                                    <div>
                                      <div className="mb-3">
                                        <textarea
                                          value={replyText}
                                          onChange={(e) =>
                                            setReplyText(e.target.value)
                                          }
                                          placeholder="Add a reply..."
                                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                          rows={2}
                                        />
                                      </div>
                                      <div className="flex space-x-2">
                                        <Button
                                          onClick={() =>
                                            handleSubmitAnswer(qa._id)
                                          }
                                          disabled={
                                            !replyText.trim() || isAddingAnswer
                                          }
                                          size="sm"
                                          className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                          {isAddingAnswer ? (
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          ) : (
                                            "Reply"
                                          )}
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            setReplyText("");
                                            toggleReplyInput(qa._id);
                                          }}
                                          size="sm"
                                          className="border border-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            No questions yet...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                      Student Reviews
                    </h3>

                    {/* Add Review Section */}

                    {!course?.reviews?.some(
                      (review: any) => review.user?._id === user?._id
                    ) &&
                      !isAddingReview && (
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
                            disabled={
                              !reviewText.trim() ||
                              userRating === 0 ||
                              isAddingReview
                            }
                            className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isAddingReview ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              "Submit Review"
                            )}
                          </Button>
                        </div>
                      )}

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {reviews?.length > 0 ? (
                        reviews?.map((review: any) => (
                          <div
                            key={review._id}
                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="w-9 h-9">
                                  <AvatarImage
                                    src={
                                      review?.user?.avatar?.url ||
                                      "/images/user.webp"
                                    }
                                    alt={review.user?.name || "User"}
                                  />
                                  <AvatarFallback>
                                    {review?.user?.name?.charAt(0) || "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                      {review.user?.name}
                                    </span>
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star: number) => (
                                        <Star
                                          key={star}
                                          className={`h-4 w-4 ${
                                            star <= review?.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-300 dark:text-gray-600"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {review.comment}
                            </p>

                            {/* Review Replies */}
                            {review?.commentReplies &&
                              review.commentReplies.length > 0 && (
                                <div className="mt-3 space-y-3">
                                  {review.commentReplies.map(
                                    (rep: any, idx: number) => (
                                      <div
                                        key={rep._id || idx}
                                        className="pl-4 border-l-2 border-orange-500 bg-orange-50 dark:bg-orange-500/10 p-3 rounded-r-md"
                                      >
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-300">
                                            <Avatar className="w-7 h-7">
                                              <AvatarImage
                                                src={
                                                  rep?.user?.avatar?.url ||
                                                  "/images/user.webp"
                                                }
                                                alt={
                                                  rep?.user?.name ||
                                                  "Instructor"
                                                }
                                              />
                                              <AvatarFallback>
                                                {rep?.user?.name?.charAt(0) ||
                                                  "I"}
                                              </AvatarFallback>
                                            </Avatar>
                                            <span>
                                              {rep?.user?.name || "Instructor"}
                                            </span>
                                            {rep?.user?.role === "admin" && (
                                              <span className="text-xs text-orange-600 dark:text-orange-400">
                                                <ShieldCheck className="h-4 w-4" />
                                              </span>
                                            )}
                                          </div>
                                          <span className="text-xs text-orange-600 dark:text-orange-400">
                                            {formatDate(rep?.createdAt || "")}
                                          </span>
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                          {rep?.comment}
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}

                            {user?.role === "admin" &&
                              (!review?.commentReplies ||
                                review.commentReplies.length === 0) && (
                                <div className="mt-3 pl-4 border-l-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800/50 p-3 rounded-r-md">
                                  <div className="mb-3">
                                    <textarea
                                      value={reviewReplyText[review._id] || ""}
                                      onChange={(e) =>
                                        setReviewReplyText((prev) => ({
                                          ...prev,
                                          [review._id]: e.target.value,
                                        }))
                                      }
                                      placeholder="Add a reply to this review..."
                                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                                      rows={2}
                                    />
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button
                                      onClick={() =>
                                        handleSubmitReviewReply(review._id)
                                      }
                                      disabled={
                                        !(
                                          reviewReplyText[review._id] || ""
                                        ).trim() || isAddingReviewReply
                                      }
                                      size="sm"
                                      className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {isAddingReviewReply ? (
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      ) : (
                                        "Reply"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              )}
                          </div>
                        ))
                      ) : (
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            No reviews yet...
                          </p>
                        </div>
                      )}
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
          <div className="overflow-y-auto max-h-[calc(100vh-120px)] p-4">
            <Accordion
              type="multiple"
              defaultValue={["section-1", "section-2", "section-3"]}
              className="space-y-3"
            >
              {course?.sections?.map((section: any, sectionIndex: number) => (
                <AccordionItem
                  key={section._id}
                  value={`section-${sectionIndex + 1}`}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <AccordionTrigger className="px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 [&[data-state=open]]:bg-slate-50 dark:[&[data-state=open]]:bg-slate-700/50 hover:no-underline [&[data-state=open]>*]:no-underline">
                    <div className="flex items-center justify-between w-full text-left">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-1">
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
                              {section?.lessons?.reduce(
                                (total: number, l: any) =>
                                  total + parseInt(l.videoLength),
                                0
                              )}{" "}
                              min
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <div className="p-0">
                      {section?.lessons?.map((lessonItem: any) => (
                        <button
                          key={lessonItem._id}
                          onClick={() => setCurrentLesson(lessonItem)}
                          className={cn(
                            "w-full flex items-center space-x-3 p-3 transition-all duration-200 text-left group relative border-b border-slate-200 dark:border-slate-700 last:border-b-0",
                            currentLesson === lessonItem
                              ? "bg-orange-50 dark:bg-orange-500/10 border-l-2 border-l-orange-500"
                              : "hover:bg-slate-100 dark:hover:bg-slate-700/50"
                          )}
                        >
                          <div className="flex-shrink-0 relative">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                                currentLesson === lessonItem
                                  ? "bg-orange-500 text-white"
                                  : "bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 group-hover:bg-slate-300 dark:group-hover:bg-slate-500"
                              )}
                            >
                              <Play
                                className={cn(
                                  "h-4 w-4 ml-0.5 transition-colors",
                                  currentLesson === lessonItem
                                    ? "text-white"
                                    : "text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white"
                                )}
                              />
                            </div>
                          </div>
                          <div
                            className={cn(
                              "flex-1 min-w-0 transition-all duration-200",
                              currentLesson === lessonItem ? "pr-28" : "pr-3"
                            )}
                          >
                            <p
                              className={cn(
                                "text-sm font-medium transition-colors truncate",
                                currentLesson === lessonItem
                                  ? "text-orange-600 dark:text-orange-400"
                                  : "text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200"
                              )}
                            >
                              {lessonItem.title}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{lessonItem.videoLength} minutes</span>
                            </p>
                          </div>
                          {currentLesson === lessonItem && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                              <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full border-0 shadow-sm whitespace-nowrap">
                                Currently Playing
                              </Badge>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAccessSection;

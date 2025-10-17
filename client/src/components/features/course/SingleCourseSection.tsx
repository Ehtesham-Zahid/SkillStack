import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/src/shadcn/ui/card";
import { Button } from "@/src/shadcn/ui/button";
import { Badge } from "@/src/shadcn/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shadcn/ui/accordion";
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
import Link from "next/link";
import Image from "next/image";
import { calculateDiscountPercentage } from "@/src/utils/calculatePercenatge";
import CoursePlayer from "@/src/components/shared/CoursePlayer";
import {
  useGetStripePublishableKeyQuery,
  useNewPaymentMutation,
} from "@/src/redux/features/order/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentDialog from "../payment/PaymentDialog";
import { useSelector } from "react-redux";
import Ratings from "@/src/components/shared/Ratings";
import AuthDialog from "../auth/AuthDialog";
import { useLoadUserQuery } from "@/src/redux/features/api/apiSlice";
import { formatDate } from "@/src/utils/formatDate";

const SingleCourseSection = ({
  course,
  stripePromise,
  clientSecret,
}: {
  course: any;
  stripePromise: any;
  clientSecret: string;
}) => {
  const { user } = useSelector((state: any) => state.auth);
  // Calculate discount percentage
  const discountPercentage =
    course?.discountedPrice > 0
      ? calculateDiscountPercentage(course.price, course.discountedPrice)
      : 0;

  const courseFeatures = [
    { icon: Code, text: "Source code included" },
    { icon: Award, text: "Full lifetime access" },
    { icon: FileText, text: "Certificate of completion" },
    { icon: Headphones, text: "Premium support" },
  ];
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="w-11/12 lg:w-11/12 2xl:w-5/6 mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-text1 dark:text-text1-dark leading-tight">
                {course.name}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Ratings rating={course.ratings} />

                  <span className="text-text2 dark:text-text2-dark">
                    ({course.reviews.length} Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-text2 dark:text-text2-dark">
                  <Users className="h-4 w-4" />
                  <span>{course?.purchased || 0} Students</span>
                </div>

                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary dark:text-primary-dark px-3 py-1 text-sm font-medium capitalize"
                >
                  {course?.level || "Beginner"}
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
                  {course?.benefits?.map((objective: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-text2 dark:text-text2-dark text-base leading-relaxed">
                        {objective?.title}
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
                  {course?.prerequisites?.map(
                    (prerequisite: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                        <p className="text-text2 dark:text-text2-dark text-base leading-relaxed">
                          {prerequisite?.title}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Overview */}
            <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark mb-6">
                  Course Overview
                </h3>
                <Accordion type="single" collapsible className="space-y-4">
                  {course?.sections?.map((section: any) => (
                    <AccordionItem
                      key={section._id}
                      value={section._id}
                      className="border border-text2/60 dark:border-text2-dark/60 rounded-xl overflow-hidden bg-surface/30 dark:bg-surface-dark/30 hover:bg-surface/50 dark:hover:bg-surface-dark/50 transition-all duration-200 "
                    >
                      <AccordionTrigger className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-primary/5 dark:hover:bg-primary-dark/5 transition-colors group hover:no-underline [&>svg]:hidden">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary-dark/20 transition-colors group-data-[state=open]:bg-primary/20 dark:group-data-[state=open]:bg-primary-dark/20">
                            <ChevronDown className="h-5 w-5 text-primary dark:text-primary-dark group-data-[state=open]:rotate-180 transition-transform duration-200" />
                          </div>
                          <div className="text-left min-w-0">
                            <h4 className="font-bold text-text1 dark:text-text1-dark text-lg group-hover:text-primary dark:group-hover:text-primary-dark transition-colors break-words leading-snug">
                              {section.title}
                            </h4>
                            <div className="flex items-center gap-3 gap-y-1 mt-1 flex-wrap">
                              <div className="flex items-center gap-1 text-text2 dark:text-text2-dark text-sm">
                                <FileText className="h-4 w-4" />
                                <span>{section.lessons.length} Lessons</span>
                              </div>
                              <div className="flex items-center gap-1 text-text2 dark:text-text2-dark text-sm">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {section.lessons?.reduce(
                                    (acc: number, lesson: any) =>
                                      acc + lesson.videoLength,
                                    0
                                  )}{" "}
                                  minutes
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge
                            variant="secondary"
                            className="bg-primary/10 text-primary dark:text-primary-dark"
                          >
                            {section.lessons.length} Lesson
                            {section.lessons.length > 1 ? "s" : ""}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="border-t border-text2/40 dark:border-text2-dark/40 bg-surface/20 dark:bg-surface-dark/20">
                        <div className="p-4 sm:p-6 space-y-3">
                          <div className="text-sm text-text2 dark:text-text2-dark font-medium mb-3">
                            Course Content:
                          </div>
                          {section?.lessons?.map(
                            (lesson: any, index: number) => (
                              <div
                                key={index}
                                className="flex flex-wrap items-center gap-4 p-4 bg-surface dark:bg-surface-dark rounded-lg border border-text2/40 dark:border-text2-dark/40 hover:border-primary/50 dark:hover:border-primary-dark/50 transition-colors group"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary-dark/20 transition-colors">
                                  <Play className="h-4 w-4 text-primary dark:text-primary-dark" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-text1 dark:text-text1-dark font-semibold group-hover:text-primary dark:group-hover:text-primary-dark transition-colors truncate">
                                    {lesson?.title}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1 text-text2 dark:text-text2-dark text-sm ml-auto shrink-0">
                                  <Clock className="h-3 w-3" />
                                  <span>{lesson?.videoLength} minutes</span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Course Details */}
            <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
              <CardContent className="px-8 py-4">
                <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark mb-6">
                  Course Details
                </h3>
                <div className="space-y-6 text-text2 dark:text-text2-dark text-base leading-relaxed">
                  <p>{course?.description}</p>
                  {/* <p>{course?.longDescription}</p> */}

                  <div className="space-y-4">
                    <h4 className="font-semibold text-text1 dark:text-text1-dark text-lg">
                      What you'll learn:
                    </h4>
                    <div className="space-y-3">
                      {course?.benefits?.map((detail: any, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="h-2 w-2 bg-primary dark:bg-primary-dark rounded-full mt-3 flex-shrink-0" />
                          <p>{detail?.title}</p>
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
            {course?.reviews?.length > 0 && (
              <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
                <CardContent className="p-8">
                  {/* Reviews Header */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 sm:h-6 sm:w-6 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-text1 dark:text-text1-dark">
                        Reviews
                      </h3>
                      <p className="text-text2 dark:text-text2-dark text-sm sm:text-base">
                        {course?.ratings} Course Rating •{" "}
                        {course?.reviews?.length} Reviews
                      </p>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {course?.reviews?.map((review: any) => (
                      <div
                        key={review.id}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-6 border-b border-text2/20 dark:border-text2-dark/20 last:border-b-0 last:pb-0"
                      >
                        <Image
                          src={review?.user?.avatar?.url}
                          alt={review.name}
                          width={48}
                          height={48}
                          className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1 sm:mb-2">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                              <h4 className="font-semibold text-text1 dark:text-text1-dark truncate">
                                {review?.user?.name}
                              </h4>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                      i < review?.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-text2 dark:text-text2-dark text-xs sm:text-sm whitespace-nowrap ml-2">
                              {formatDate(review?.createdAt)}
                            </span>
                          </div>
                          <p className="text-text2 dark:text-text2-dark leading-relaxed break-words">
                            {review?.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Video Player */}
              <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark shadow-sm">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <CoursePlayer
                      videoUrl={course?.demoUrl}
                      title={course?.name}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary-dark/5 dark:to-primary-dark/10 border-primary/20 dark:border-primary-dark/20 shadow-lg">
                <CardContent className="p-8">
                  {user?.courses?.find(
                    (courseItem: any) =>
                      courseItem.courseId.toString() === course?._id
                  ) ? (
                    <Link
                      href={`/course-access/${course?._id}`}
                      className="w-full"
                    >
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-400 hover:border-green-500 dark:border-green-500 dark:hover:border-green-600 cursor-pointer">
                        🎓 Access Course
                      </Button>
                    </Link>
                  ) : (
                    <div className="text-center space-y-6">
                      {/* Price Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3">
                          {course.discountedPrice > 0 ? (
                            <>
                              <span className="text-5xl font-black text-text1 dark:text-text1-dark">
                                ${course.discountedPrice}
                              </span>
                              <div className="flex flex-col items-start">
                                <span className="text-lg text-text2 dark:text-text2-dark line-through">
                                  ${course.price}
                                </span>
                                <Badge
                                  variant="destructive"
                                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 text-sm font-bold shadow-md"
                                >
                                  {discountPercentage}% OFF
                                </Badge>
                              </div>
                            </>
                          ) : (
                            <span className="text-5xl font-black text-text1 dark:text-text1-dark">
                              ${course.price}
                            </span>
                          )}
                        </div>

                        <div className="text-center">
                          <p className="text-text2 dark:text-text2-dark text-sm">
                            One-time payment • Lifetime access
                          </p>
                        </div>
                      </div>

                      {user ? (
                        <PaymentDialog
                          trigger={
                            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 dark:from-primary-dark dark:to-primary-dark/80 dark:hover:from-primary-dark/90 dark:hover:to-primary-dark/70 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                              Buy Now
                            </Button>
                          }
                          stripePromise={stripePromise}
                          clientSecret={clientSecret}
                          data={course}
                          user={user}
                        />
                      ) : (
                        <>
                          <AuthDialog singleCourse={true} />
                          {/* Mount OTP dialog at app level so Redux-controlled open works here too */}
                          {/* Import inline to avoid unused in pages where user is already logged in */}
                        </>
                      )}

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
                  )}
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

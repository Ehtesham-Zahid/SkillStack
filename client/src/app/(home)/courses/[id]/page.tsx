"use client";

import Heading from "@/src/utils/Heading";
import SingleCourseSection from "@/src/components/features/course/SingleCourseSection";
import Spinner from "@/src/components/ui/Spinner";
import { useGetSingleCourseQuery } from "@/src/redux/features/course/courseApi";
import {
  useGetStripePublishableKeyQuery,
  useNewPaymentMutation,
} from "@/src/redux/features/order/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams();
  const { data: course, isLoading: isCourseLoading } = useGetSingleCourseQuery(
    id as string
  );
  const { data: config } = useGetStripePublishableKeyQuery();
  const [createPaymentIntent, { data: paymentIntentData }] =
    useNewPaymentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<any>("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.key;
      setStripePromise(loadStripe(publishablekey));
    }
    if (course) {
      const amount = Math.round(course.course.price * 100);
      createPaymentIntent({ amount });
    }
  }, [config, course, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return isCourseLoading ? (
    <Spinner />
  ) : (
    stripePromise && (
      <>
        <Heading
          title={`SkillStack | ${course?.course?.name || "Course"}`}
          description={
            course?.course?.description ||
            "Learn with SkillStack - Premium online courses for skill development"
          }
          keywords={`${
            course?.course?.name || "Course"
          }, Online Learning, SkillStack, ${
            course?.course?.category || "Programming"
          }, Education`}
        />
        <div>
          <SingleCourseSection
            course={course?.course}
            stripePromise={stripePromise}
            clientSecret={clientSecret}
          />
        </div>
      </>
    )
  );
};

export default Page;

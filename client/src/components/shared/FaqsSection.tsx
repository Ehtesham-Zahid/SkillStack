"use client";
import { Accordion } from "@/src/shadcn/ui/accordion";
import FaqAccordian from "@/src/components/shared/FaqAccordian";
import { useGetLayoutByTypeQuery } from "@/src/redux/features/layout/layoutApi";
import Spinner from "../ui/Spinner";

const FaqsSection = () => {
  const { data: faqsData, isLoading } = useGetLayoutByTypeQuery({
    type: "Faqs",
  });
  const faqs = faqsData?.layout?.faq || [];

  return (
    <section className="overflow-hidden py-16 w-11/12  lg:w-11/12 2xl:w-5/6 mx-auto">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text1 dark:text-text1-dark">
          Frequently Asked{" "}
          <span className="text-primary dark:text-primary-dark">Questions</span>
        </h2>
        <p className="mt-4 text-text2 dark:text-text2-dark">
          Find answers to common questions about our platform, courses, and
          learning experience.
        </p>
      </div>

      <div className="mt-10 px-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <Accordion type="single" collapsible className="grid gap-4">
            {faqs.map((faq: any) => (
              <FaqAccordian
                key={faq._id}
                id={faq._id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default FaqsSection;

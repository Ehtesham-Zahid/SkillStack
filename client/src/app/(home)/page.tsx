"use client";

import Heading from "../../utils/Heading";
import Hero from "../../components/features/home/Hero";
import HomeCoursesSection from "@/src/components/features/home/HomeCoursesSection";
import TestimonialsSection from "@/src/components/features/home/TestimonialsSection";
import FaqsSection from "@/src/components/shared/FaqsSection";

const Page = () => {
  return (
    <>
      <Heading
        title="SkillStack | Home"
        description="SkillStack is a platform for learning and teaching skills"
        keywords="Programming, Web Development, AI, Machine Learning, Data Science"
      />
      <Hero />
      <HomeCoursesSection />
      <TestimonialsSection />
      <FaqsSection />
    </>
  );
};

export default Page;

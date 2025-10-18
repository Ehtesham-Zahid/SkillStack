import React from "react";
import Heading from "@/src/utils/Heading";
import FaqsSection from "@/src/components/shared/FaqsSection";

const page = () => {
  return (
    <>
      <Heading
        title="SkillStack | Frequently Asked Questions"
        description="Find answers to common questions about SkillStack courses, enrollment, payment, and learning experience"
        keywords="FAQ, Frequently Asked Questions, Help, Support, SkillStack Help, Course Questions, Learning Support"
      />
      <div>
        <FaqsSection />
      </div>
    </>
  );
};

export default page;

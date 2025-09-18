"use client";

import Heading from "../../utils/Heading";
import Hero from "../../components/features/home/Hero";

interface Props {}

const Page = (props: Props) => {
  return (
    <>
      <Heading
        title="SkillStack | Home"
        description="SkillStack is a platform for learning and teaching skills"
        keywords="Programming, Web Development, AI, Machine Learning, Data Science"
      />
      <Hero />
    </>
  );
};

export default Page;

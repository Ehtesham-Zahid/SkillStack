"use client";

import Heading from "./utils/Heading";
import { FC } from "react";

interface Props {}

const page: FC<Props> = (props) => {
  return (
    <>
      <Heading
        title="SkillStack | Home"
        description="SkillStack is a platform for learning and teaching skills"
        keywords="Programming, Web Development, AI, Machine Learning, Data Science"
      />
    </>
  );
};

export default page;

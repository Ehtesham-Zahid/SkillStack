"use client";
import React from "react";

import Heading from "@/src/utils/Heading";
import { useSelector } from "react-redux";
import ProfileInfo from "@/src/components/features/profile/ProfileInfo";

const Page = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="w-full">
      <Heading
        title={`${user?.name}'s Profile`}
        description="SkillStack is a platform for learning and teaching skills"
        keywords="Programming, Web Development, AI, Machine Learning, Data Science"
      />
      <ProfileInfo />
    </div>
  );
};

export default Page;

"use client";
import React from "react";
import Protected from "@/src/hooks/useProtected";
import Heading from "@/src/utils/Heading";
import { useSelector } from "react-redux";
import ProfileInfo from "@/src/components/features/profile/ProfileInfo";

const page = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name}'s Profile`}
          description="SkillStack is a platform for learning and teaching skills"
          keywords="Programming, Web Development, AI, Machine Learning, Data Science"
        />
        <ProfileInfo />
      </Protected>
    </div>
  );
};

export default page;

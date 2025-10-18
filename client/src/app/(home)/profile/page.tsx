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
        title={`SkillStack | ${user?.name}'s Profile`}
        description="Manage your SkillStack profile, view learning progress, and access your account settings"
        keywords="User Profile, Account Settings, Learning Progress, SkillStack Profile, User Dashboard"
      />
      <ProfileInfo />
    </div>
  );
};

export default Page;

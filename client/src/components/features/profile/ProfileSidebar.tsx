import React from "react";
import ProfileSidebarItem from "./ProfileSidebarItem";
import { MdAccountCircle } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { CiLogout } from "react-icons/ci";

const ProfileSidebar = () => {
  const PROFILE_SIDEBAR_ITEMS = [
    {
      label: "My Account",
      href: "/profile",
      icon: <MdAccountCircle size={24} />,
    },
    {
      label: "Change Password",
      href: "/profile/change-password",
      icon: <RiLockPasswordFill size={24} />,
    },
    {
      label: "Enrolled Courses",
      href: "/profile/enrolled-courses",
      icon: <SiCoursera size={24} />,
    },
    {
      label: "Logout",
      icon: <CiLogout size={24} className="text-red-500" />,
    },
  ];
  return (
    <div className="w-80 rounded-md h-[500px] bg-surface dark:bg-surface-dark p-5 ">
      <ul className="flex flex-col gap-8">
        {PROFILE_SIDEBAR_ITEMS.map((item) => (
          <ProfileSidebarItem key={item.label} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default ProfileSidebar;

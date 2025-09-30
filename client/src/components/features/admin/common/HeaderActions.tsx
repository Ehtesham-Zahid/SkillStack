import { Link } from "lucide-react";
import ThemeToggle from "@/src/components/ui/ThemeToggle";
import Image from "next/image";
import React from "react";
import { IoNotifications } from "react-icons/io5";

const HeaderActions = () => {
  return (
    <div className="flex items-center  gap-5 bg-transparent p-5">
      <ThemeToggle />
      <IoNotifications size={20} className="cursor-pointer" />
    </div>
  );
};

export default HeaderActions;

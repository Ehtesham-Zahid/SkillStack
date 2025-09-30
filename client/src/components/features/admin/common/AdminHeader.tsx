import { useSelector } from "react-redux";

import ThemeToggle from "@/src/components/ui/ThemeToggle";

import Image from "next/image";
import Link from "next/link";

const AdminHeader = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="w-full bg-surface border-b    dark:bg-surface-dark dark:border-b-0 sticky top-0 z-50 py-1.5">
      <div className="flex items-center justify-between w-full mx-auto py-4 gap-4 px-5">
        <p className="text-3xl sm:text-4xl lg:text-4xl font-black text-primary">
          Skill<span className="text-black dark:text-white">Stack</span>
        </p>
        <div className="flex items-center lg:gap-8 gap-5 ">
          <ThemeToggle />
          <Link href="/profile">
            <Image
              src={user?.avatar?.url || "/images/user.webp"}
              alt="user"
              width={32}
              height={32}
              className="rounded-full w-8 h-8 cursor-pointer border-2 border-primary "
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

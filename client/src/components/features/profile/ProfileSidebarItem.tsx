"use client";
import Link from "next/link";
import { useLogoutMutation } from "@/src/redux/features/auth/authApi";
import Spinner from "../../ui/Spinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";

interface ProfileSidebarItemProps {
  item: {
    label: string;
    href?: string;
    icon: React.ReactNode;
  };
}

const ProfileSidebarItem = ({ item }: ProfileSidebarItemProps) => {
  const router = useRouter();
  const [
    logout,
    {
      isLoading: logoutLoading,
      isSuccess: logoutSuccess,
      isError: logoutError,
    },
  ] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      router.push("/");
      toast.loading("Logging out...");
      await signOut({ redirect: false });
      await logout().unwrap(); // unwrap throws if request fails
      toast.dismiss();
      toast.success("Logged out successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Logout failed");
    }
  };

  return logoutLoading ? (
    <Spinner />
  ) : item.label === "Logout" ? (
    <li
      className="flex items-center gap-2.5 cursor-pointer"
      onClick={() => logoutHandler()}
    >
      {item.icon}
      <span className="text-text1 dark:text-text1-dark hover:text-primary dark:hover:text-primary font-medium text-lg hidden lg:block">
        {item.label}
      </span>
    </li>
  ) : (
    <li>
      <Link
        href={item.href || ""}
        className="flex items-center gap-2.5 cursor-pointer"
      >
        {item.icon}
        <p className="text-text1 dark:text-text1-dark hover:text-primary dark:hover:text-primary font-medium text-lg hidden lg:block">
          {item.label}
        </p>
      </Link>
    </li>
  );
};

export default ProfileSidebarItem;

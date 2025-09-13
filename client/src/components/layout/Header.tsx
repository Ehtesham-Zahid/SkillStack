import NavItem from "../ui/NavItem";
import ThemeToggle from "../ui/ThemeToggle";
import { NAV_ITEMS } from "@/src/constants";
import Sidebar from "./Sidebar";
import AuthDialog from "../dialogs/AuthDialog";
import { useSelector } from "react-redux";
import Image from "next/image";

const Header = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="w-full bg-surface border-b    dark:bg-surface-dark dark:border-b-0">
      <div className="flex items-center justify-between w-11/12 2xl:w-5/6 mx-auto py-4 gap-4">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary">
          Skill<span className="text-black dark:text-white">Stack</span>
        </p>
        <div className="flex items-center lg:gap-8 gap-5 ">
          <ul className="lg:flex items-center gap-8  hidden">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} href={item.href} label={item.label} />
            ))}
          </ul>
          <ThemeToggle />
          {user ? (
            <Image
              src={user?.avatar?.url || "/images/client1.webp"}
              alt="user"
              width={32}
              height={32}
              className="rounded-full w-8 h-8 cursor-pointer"
            />
          ) : (
            <AuthDialog />
          )}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Header;

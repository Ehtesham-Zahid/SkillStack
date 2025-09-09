import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import { UserCircle2Icon } from "lucide-react";
import { NAV_ITEMS } from "@/app/constants";
import Sidebar from "./Sidebar";
import AuthDialog from "./AuthDialog";
import OtpDialog from "./OtpDialog";

const Header = () => {
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
          <AuthDialog />
          <Sidebar />
          <OtpDialog />
        </div>
      </div>
    </div>
  );
};

export default Header;

import NavItem from "./NavItem";
import ThemeSwitch from "./ThemeSwitch";
import { UserCircle2Icon } from "lucide-react";
import { NAV_ITEMS } from "@/app/constants";
import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <div className="w-full bg-surface border-b   ">
      <div className="flex items-center justify-between w-11/12 mx-auto py-4 gap-4">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-black">
          Skill<span className="text-primary">Stack</span>
        </p>
        <div className="flex items-center lg:gap-8 gap-5 ">
          <ul className="lg:flex items-center gap-8  hidden">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} href={item.href} label={item.label} />
            ))}
          </ul>
          <ThemeSwitch />
          <div className=" items-center justify-center cursor-pointer lg:flex hidden">
            <UserCircle2Icon size={26} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Header;

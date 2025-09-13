import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/src/shadcn/ui/sheet";
import { MenuIcon, UserCircle2Icon } from "lucide-react";
import { NAV_ITEMS } from "@/src/constants";
import NavItem from "../ui/NavItem";

const Sidebar = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <MenuIcon size={26} className="cursor-pointer text-primary mt-1" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-surface">
          <SheetHeader className="border-b border-gray-200 pb-4">
            <p className="text-3xl font-black text-primary">
              Skill<span className="text-black">Stack</span>
            </p>
          </SheetHeader>
          <ul className="flex flex-col gap-4 mt-2 px-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <NavItem key={item.label} href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
          <SheetFooter className="flex flex-row gap-2 items-center justify-start  mt-auto border-t border-gray-200 pt-4">
            <UserCircle2Icon size={28} /> Ehtesham Zahid
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;

import { MenuIcon, UserCircle2Icon } from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/src/shadcn/ui/sheet";

import NavItem from "../ui/NavItem";

import { NAV_ITEMS } from "@/src/constants";
import { useSelector } from "react-redux";
import AuthDialog from "../features/auth/AuthDialog";
import OtpDialog from "../features/auth/OtpDialog";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <MenuIcon size={26} className="cursor-pointer text-primary mt-1" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-surface dark:bg-surface-dark">
          <SheetHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="text-3xl font-black text-primary">
              Skill
              <span className="text-black dark:text-text1-dark">Stack</span>
            </p>
          </SheetHeader>
          <ul className="flex flex-col gap-4 mt-2 px-5">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <NavItem
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  onClick={() => setOpen(false)}
                />
              </li>
            ))}
          </ul>
          <SheetFooter className="flex flex-row gap-2 items-center justify-start mt-auto border-t border-gray-200 dark:border-gray-700 pt-4">
            {user ? (
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex flex-row items-center gap-2"
              >
                <Image
                  src={user?.avatar?.url || "/images/user.webp"}
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-full w-8 h-8 cursor-pointer border-2 border-primary "
                />
                <span className="text-text1 dark:text-text1-dark font-medium">
                  {user?.name}
                </span>
              </Link>
            ) : (
              <>
                {" "}
                <AuthDialog />
                <OtpDialog />
              </>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;

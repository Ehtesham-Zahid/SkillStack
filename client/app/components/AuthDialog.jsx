"use client";

import { Button } from "@/app/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/shadcn/ui/dialog";
import { UserCircle2Icon } from "lucide-react";
import AuthForm from "./AuthForm";

const AuthDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className=" items-center justify-center cursor-pointer lg:flex hidden">
            <UserCircle2Icon size={26} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark">
          <DialogHeader className=" mb-2">
            <DialogTitle className="text-xl text-text1 dark:text-text1-dark">
              Welcome to{" "}
              <span className=" font-bold   underline underline-offset-4 decoration-primary decoration-2">
                SkillStack
              </span>
            </DialogTitle>
            <DialogDescription className="text-text1 dark:text-text1-dark">
              Please enter your details to continue.
            </DialogDescription>
          </DialogHeader>
          <AuthForm />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AuthDialog;

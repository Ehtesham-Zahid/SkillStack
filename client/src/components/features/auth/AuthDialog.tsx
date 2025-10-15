"use client";

import { useSelector, useDispatch } from "react-redux";
import { UserCircle2Icon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shadcn/ui/dialog";
import AuthForm from "./AuthForm";
import { setShowAuthDialog } from "../../../redux/features/auth/authSlice";
import { Button } from "@/src/shadcn/ui/button";

const AuthDialog = ({ singleCourse = false }: { singleCourse?: boolean }) => {
  const { showAuthDialog } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={showAuthDialog}
      onOpenChange={() => dispatch(setShowAuthDialog(!showAuthDialog))}
    >
      <form>
        <DialogTrigger asChild>
          {singleCourse ? (
            <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 dark:from-primary-dark dark:to-primary-dark/80 dark:hover:from-primary-dark/90 dark:hover:to-primary-dark/70 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Sign in to continue
            </Button>
          ) : (
            <div className=" items-center justify-center cursor-pointer lg:flex hidden">
              <UserCircle2Icon size={26} />
            </div>
          )}
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

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

const AuthDialog = () => {
  const { showAuthDialog } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={showAuthDialog}
      onOpenChange={() => dispatch(setShowAuthDialog(!showAuthDialog))}
    >
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

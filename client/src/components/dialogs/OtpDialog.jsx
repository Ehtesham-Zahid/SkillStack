"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shadcn/ui/dialog";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import OtpForm from "../forms/OtpForm";
import { MailIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setShowOtpDialog } from "../../redux/features/auth/authSlice";

const OtpDialog = () => {
  const { showOtpDialog } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={showOtpDialog}
      onOpenChange={() => dispatch(setShowOtpDialog(!showOtpDialog))}
    >
      <form>
        <DialogTrigger asChild>
          <MailIcon size={26} className="cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark">
          <DialogHeader>
            <DialogTitle className="text-3xl text-text1 dark:text-text1-dark text-center font-bold">
              Verify your Account
            </DialogTitle>
            <DialogDescription className="text-text1 dark:text-text1-dark text-center">
              Please enter the code sent to your email.
            </DialogDescription>
            <IoShieldCheckmarkSharp
              size={64}
              className="mx-auto mt-4 bg-orange-100 p-2 rounded-full text-primary"
            />
          </DialogHeader>
          <OtpForm />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default OtpDialog;

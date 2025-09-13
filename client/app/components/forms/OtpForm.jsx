"use client";

import { z } from "zod";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/app/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/shadcn/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/shadcn/ui/input-otp";

import { useActivationMutation } from "../../../redux/features/auth/authApi";
import {
  setShowOtpDialog,
  setShowAuthDialog,
} from "../../../redux/features/auth/authSlice";

const FormSchema = z.object({
  pin: z.number().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

const OtpForm = () => {
  const [resendOtp, setResendOtp] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activate, { data, error, isSuccess, isLoading, isError }] =
    useActivationMutation();

  const form = useForm({
    loginResolver: zodResolver(FormSchema),
    defaultValues: {
      pin: 0,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated");
      dispatch(setShowOtpDialog(false));
      dispatch(setShowAuthDialog(true));
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  const onSubmit = async (data) => {
    await activate({
      activationToken: token,
      activationCode: data.pin,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col items-center"
      >
        <FormField
          className=" "
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className=" ">
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup className="w-full gap-5 mt-5">
                    <InputOTPSlot
                      index={0}
                      className="text-text1 dark:text-text1-dark border rounded-md"
                    />
                    <InputOTPSlot
                      index={1}
                      className="text-text1 dark:text-text1-dark border rounded-md"
                    />
                    <InputOTPSlot
                      index={2}
                      className="text-text1 dark:text-text1-dark border rounded-md"
                    />
                    <InputOTPSlot
                      index={3}
                      className="text-text1 dark:text-text1-dark border rounded-md"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <LuLoaderCircle className="animate-spin" />
          ) : (
            "Verify OTP"
          )}
        </Button>
      </form>
      <p
        className={`text-xs text-center text-text2 dark:text-text2-dark ${
          resendOtp ? "hidden" : ""
        }`}
      >
        Didn't receive an OTP?{" "}
        <span
          className="text-primary  cursor-pointer hover:underline"
          onClick={() => setResendOtp(true)}
        >
          Resend OTP
        </span>
      </p>
    </Form>
  );
};

export default OtpForm;

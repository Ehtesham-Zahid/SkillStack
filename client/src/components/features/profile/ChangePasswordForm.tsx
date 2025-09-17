"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/src/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shadcn/ui/form";
import { Input } from "@/src/shadcn/ui/input";
import { LuLoaderCircle } from "react-icons/lu";
import { useUpdatePasswordMutation } from "@/src/redux/features/user/userApi";

const updateUserInfoSchema = z
  .object({
    oldPassword: z.string().min(8),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // attach the error to confirmPassword field
    message: "Passwords do not match",
  });

const ChangePasswordForm = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [updatePassword, { isLoading, isSuccess, isError, error }] =
    useUpdatePasswordMutation();

  const form = useForm({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: { oldPassword: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: any) => {
    console.log(data);

    await updatePassword({
      oldPassword: data.oldPassword,
      newPassword: data.password,
    });
  };

  useEffect(() => {
    form.reset({ oldPassword: "", password: "", confirmPassword: "" });
    if (isSuccess) {
      toast.success("Password updated successfully");
    }
    if (isError && "data" in error) {
      toast.error((error as any)?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Change Password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    {...field}
                    className="sm:w-md w-xs"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    {...field}
                    className="sm:w-md w-xs"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="********"
                    {...field}
                    className="sm:w-md w-xs"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="sm:w-md w-xs cursor-pointer mt-2 text-white text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <LuLoaderCircle className="animate-spin" />
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;

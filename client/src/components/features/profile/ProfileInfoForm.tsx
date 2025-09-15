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
import { useUpdateUserInfoMutation } from "@/src/redux/features/user/userApi";
import { Input } from "@/src/shadcn/ui/input";
import { LuLoaderCircle } from "react-icons/lu";
import Spinner from "../../ui/Spinner";

const updateUserInfoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

const ProfileInfoForm = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [
    updateUserInfo,
    {
      data: updateUserInfoData,
      error: updateUserInfoError,
      isSuccess: updateUserInfoSuccess,
      isLoading: updateUserInfoLoading,
    },
  ] = useUpdateUserInfoMutation();

  const form = useForm({
    resolver: zodResolver(updateUserInfoSchema),
    defaultValues: { name: user?.name, email: user?.email },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    await updateUserInfo({ name: data.name, email: user?.email });
  };

  useEffect(() => {
    if (updateUserInfoSuccess) {
      toast.success("User info updated successfully");
    }
    if (updateUserInfoError) {
      toast.error("User info update failed");
    }
  }, [updateUserInfoSuccess, updateUserInfoError]);

  return updateUserInfoLoading ? (
    <Spinner />
  ) : (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="w-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            disabled={true}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    className="opacity-50 cursor-not-allowed w-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full cursor-pointer mt-2 text-white text-base"
            disabled={updateUserInfoLoading}
          >
            {updateUserInfoLoading ? (
              <LuLoaderCircle className="animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileInfoForm;

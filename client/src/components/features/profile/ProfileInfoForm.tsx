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
import { useUpdateProfilePictureMutation } from "@/src/redux/features/profile/profileApi";
import { Input } from "@/src/shadcn/ui/input";

const updateProfilePictureSchema = z.object({
  avatar: z.string().min(1),
});

const updateProfileInfoSchema = z.object({
  name: z.string().min(2).optional(),
});

const ProfileInfoForm = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [
    updateProfilePicture,
    {
      data: updateProfilePictureData,
      error: updateProfilePictureError,
      isSuccess: updateProfilePictureSuccess,
      isLoading: updateProfilePictureLoading,
    },
  ] = useUpdateProfilePictureMutation();

  const form = useForm({
    resolver: zodResolver(updateProfilePictureSchema),
    defaultValues: { avatar: "" },
  });

  const onSubmit = async (data: any) => {
    await updateProfilePicture({ avatar: data.avatar });
  };

  return (
    <div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="w-full mt-2">
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export default ProfileInfoForm;

"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { useUpdateProfilePictureMutation } from "@/src/redux/features/user/userApi";
import Image from "next/image";
import { Camera } from "lucide-react";
import Spinner from "../../ui/Spinner";

const ProfileImageForm = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState<string>("");

  const [
    updateProfilePicture,
    {
      data: updateProfilePictureData,
      error: updateProfilePictureError,
      isSuccess: updateProfilePictureSuccess,
      isLoading: updateProfilePictureLoading,
    },
  ] = useUpdateProfilePictureMutation();

  const imageChangeHandler = (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result as string;
        setAvatar(avatar);
        updateProfilePicture({ avatar });
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (updateProfilePictureSuccess) {
      toast.success("Profile picture updated successfully");
    }
    if (updateProfilePictureError) {
      toast.error("Profile picture update failed");
    }
  }, [updateProfilePictureSuccess, updateProfilePictureError]);

  useEffect(() => {
    if (user?.avatar?.url) {
      setAvatar(user?.avatar?.url);
    }
  }, [user?.avatar?.url]);

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <form className="space-y-5">
        {updateProfilePictureLoading ? (
          <Spinner />
        ) : (
          <div className="relative">
            <Image
              width={160}
              height={160}
              quality={100}
              loading="lazy"
              src={avatar || user?.avatar?.url || "/images/user.webp"}
              alt="Preview"
              className={
                "sm:w-40 sm:h-40 w-32 h-32  rounded-full border-4 border-primary "
              }
            />
            <label htmlFor="file-input">
              <Camera
                className="absolute right-2 top-24 sm:top-30 bg-primary rounded-full text-white p-1 cursor-pointer"
                size={28}
              />
              <input
                id="file-input"
                className="sr-only"
                accept=".jpg,.jpeg,.png"
                type="file"
                onChange={imageChangeHandler}
              />
            </label>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileImageForm;

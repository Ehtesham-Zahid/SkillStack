"use client";

import React, { useEffect } from "react";
import ChangePassword from "@/src/components/features/profile/ChangePassword";
import { useLoadUserQuery } from "@/src/redux/features/api/apiSlice";
import { useRouter } from "next/navigation";
import Spinner from "@/src/components/ui/Spinner";

const Page = () => {
  const router = useRouter();
  const { data: user, isLoading } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (!isLoading && user?.user?.provider !== "manual") {
      router.replace("/"); // client-side safe redirect
    }
  }, [isLoading, user, router]);

  if (isLoading) return <Spinner />;

  if (!user?.user || user.user.provider !== "manual") return null; // prevents UI flash

  return (
    <div className="w-full">
      <ChangePassword />
    </div>
  );
};

export default Page;

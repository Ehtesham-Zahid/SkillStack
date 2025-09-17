"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/src/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import Spinner from "@/src/components/ui/Spinner";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();

  const [socialAuth, { error, isSuccess, isError, isLoading }] =
    useSocialAuthMutation();

  useEffect(() => {
    if (!user && data) {
      console.log(data);
      const session = data as any;
      socialAuth({
        email: session.user?.email,
        name: session.user?.name,
        avatar: session.user?.image,
        provider: session?.provider,
      });
    }
  }, [user, data]);

  useEffect(() => {
    if (isSuccess) toast.success("Logged in successfully");
    if (isError && "data" in error) {
      toast.error((error as any)?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError, error]);

  return <>{isLoading ? <Spinner /> : children}</>;
}

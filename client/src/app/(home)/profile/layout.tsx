"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "@/src/components/features/profile/ProfileSidebar";
import { useLoadUserQuery } from "@/src/redux/features/api/apiSlice";
import Spinner from "@/src/components/ui/Spinner";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useLoadUserQuery(undefined);

  useEffect(() => {
    if (!isLoading && (!user?.user || isError)) {
      router.replace("/"); // redirect unauthenticated user to home
    }
  }, [isLoading, user, isError, router]);

  if (isLoading) return <Spinner />;

  // You can optionally return null while redirecting to avoid hydration flicker
  if (!user?.user) return null;

  return (
    <section>
      <main className="w-11/12 2xl:w-5/6 mx-auto my-20 flex lg:flex-row flex-col gap-10">
        <ProfileSidebar />
        {children}
      </main>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/src/components/features/admin/common/AdminHeader";
import AdminSidebar from "@/src/components/features/admin/common/AdminSidebar";
import HeaderActions from "@/src/components/features/admin/common/HeaderActions";
import { SidebarProvider, SidebarTrigger } from "@/src/shadcn/ui/sidebar";
import { useLoadUserQuery } from "@/src/redux/features/api/apiSlice";
import Spinner from "@/src/components/ui/Spinner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useLoadUserQuery(undefined);

  useEffect(() => {
    if (!isLoading) {
      if (!user?.user || user.user.role !== "admin" || isError) {
        router.replace("/"); // redirect to home if not admin
      }
    }
  }, [isLoading, user, isError, router]);

  if (isLoading) return <Spinner />;
  if (!user?.user || user.user.role !== "admin") return null;

  return (
    <section className="flex flex-row w-full">
      <SidebarProvider>
        <AdminSidebar />
        <div className="w-full flex flex-col">
          <div className="flex items-start justify-between w-full mx-auto">
            <SidebarTrigger />
            <HeaderActions />
          </div>
          <main className="w-full">{children}</main>
        </div>
      </SidebarProvider>
    </section>
  );
}

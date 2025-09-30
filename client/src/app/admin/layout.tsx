"use client";

import AdminHeader from "@/src/components/features/admin/common/AdminHeader";
import AdminSidebar from "@/src/components/features/admin/common/AdminSidebar";
import HeaderActions from "@/src/components/features/admin/common/HeaderActions";
import { SidebarProvider, SidebarTrigger } from "@/src/shadcn/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-row w-full">
      <SidebarProvider>
        <AdminSidebar />
        <div className="w-full flex flex-col">
          <div className="flex items-start justify-between w-full mx-auto ">
            <SidebarTrigger />
            <HeaderActions />
          </div>
          <main className=" w-full ">{children}</main>
        </div>
      </SidebarProvider>
    </section>
  );
}

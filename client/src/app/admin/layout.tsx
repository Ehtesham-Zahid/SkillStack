"use client";

import AdminHeader from "@/src/components/features/admin/user/AdminHeader";
import AdminSidebar from "@/src/components/features/admin/user/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/shadcn/ui/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <SidebarProvider>
        <main className="flex flex-col w-full">
          <AdminHeader />
          <div className="  flex lg:flex-row flex-col  ">
            <AdminSidebar />
            <SidebarTrigger />
            <div className="w-11/12 2xl:w-5/6 mx-auto my-10">{children}</div>
          </div>
        </main>
      </SidebarProvider>
    </section>
  );
}

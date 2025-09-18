"use client";

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
        <AdminSidebar />
        <SidebarTrigger />
        <main className="w-11/12 2xl:w-5/6 mx-auto my-20 flex lg:flex-row flex-col gap-10 ">
          {children}
        </main>
      </SidebarProvider>
    </section>
  );
}

"use client";

import ProfileSidebar from "@/src/components/features/profile/ProfileSidebar";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <main className="w-11/12 2xl:w-5/6 mx-auto my-20 flex lg:flex-row flex-col gap-10 ">
        <ProfileSidebar />
        {children}
      </main>
    </section>
  );
}

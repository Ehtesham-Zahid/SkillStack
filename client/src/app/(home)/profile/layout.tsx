"use client";

import ProfileSidebar from "@/src/components/features/profile/ProfileSidebar";
import { ThemeProvider } from "@/src/utils/ThemeProvider";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`antialiased bg-background dark:bg-background-dark`}>
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      > */}
      <main className="w-11/12 2xl:w-5/6 mx-auto my-20 flex lg:flex-row flex-col gap-10 ">
        <ProfileSidebar />
        {children}
      </main>
      {/* </ThemeProvider> */}
    </section>
  );
}

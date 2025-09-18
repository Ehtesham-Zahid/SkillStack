"use client";
import React from "react";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "SkillStack | Home",
//   description: "SkillStack is a platform for learning and teaching skills",
// };

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </section>
  );
}

"use client";
import type { Metadata } from "next";
import React, { useEffect } from "react";
// import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { ThemeProvider } from "../utils/ThemeProvider";
import { Provider } from "./Provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import Spinner from "../components/ui/Spinner";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "../redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import AuthProvider from "../utils/AuthProvider";

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "SkillStack | Home",
//   description: "SkillStack is a platform for learning and teaching skills",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-background dark:bg-background-dark`}>
        <Provider>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Custom>
                <Toaster />
                <AuthProvider>
                  <Header />
                  <main className="min-h-screen">{children}</main>
                  <Footer />
                </AuthProvider>
              </Custom>
            </ThemeProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}

const Custom = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoadUserQuery({});
  return <>{isLoading ? <Spinner /> : children}</>;
};

"use client";
import type { Metadata } from "next";
import React from "react";
// import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../utils/ThemeProvider";
import { Provider } from "./Provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "../redux/features/api/apiSlice";
import AuthProvider from "../utils/AuthProvider";

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
              {/* <Custom> */}
              <Toaster />
              <AuthProvider>{children}</AuthProvider>
              {/* </Custom> */}
            </ThemeProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}

// const Custom = ({ children }: { children: React.ReactNode }) => {
//   const { isLoading } = useLoadUserQuery({});
//   return <>{isLoading ? <Spinner /> : children}</>;
// };

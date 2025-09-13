"use client";
import type { Metadata } from "next";
// import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import { ThemeProvider } from "./utils/ThemeProvider";
import { Provider } from "./Provider";
import { Toaster } from "react-hot-toast";

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Header />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

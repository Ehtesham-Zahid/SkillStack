import type { Metadata } from "next";
// import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ThemeProvider } from "./utils/ThemeProvider";

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "SkillStack | Home",
  description: "SkillStack is a platform for learning and teaching skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-background dark:bg-background-dark`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

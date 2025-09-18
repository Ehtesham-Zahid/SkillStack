"use client";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`antialiased bg-background dark:bg-background-dark`}>
      <main className="w-11/12 2xl:w-5/6 mx-auto my-20 flex lg:flex-row flex-col gap-10 ">
        {children}
      </main>
    </section>
  );
}

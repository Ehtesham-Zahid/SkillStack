export default function CreateCourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-11/12 2xl:w-5/6 mx-auto">{children}</main>;
}

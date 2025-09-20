export default function CreateCourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-11/12   mx-auto">{children}</main>;
}

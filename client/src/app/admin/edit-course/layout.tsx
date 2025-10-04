export default function EditCourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-11/12   mx-auto">{children}</main>;
}

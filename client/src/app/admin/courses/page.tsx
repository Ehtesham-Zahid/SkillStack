"use client";
import { columns } from "@/src/components/features/admin/course/CoursesTable/columns";
import CoursesTable from "@/src/components/features/admin/course/CoursesTable/CoursesTable";
import { useGetAllCoursesAdminQuery } from "@/src/redux/features/course/courseApi";
import Spinner from "@/src/components/ui/Spinner";
import { useState } from "react";

const page = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const { data, isLoading, isFetching } = useGetAllCoursesAdminQuery({
    page,
    limit,
  });

  console.log(data);
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-11/12   mx-auto">
      <CoursesTable
        columns={columns}
        data={data?.courses}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={data?.totalPages}
        totalCourses={data?.totalCourses}
        isFetching={isFetching}
      />
    </div>
  );
};

export default page;

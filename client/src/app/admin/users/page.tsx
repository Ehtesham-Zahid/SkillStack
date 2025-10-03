"use client";
import { columns } from "@/src/components/features/admin/user/UsersTable/columns";
import UsersTable from "@/src/components/features/admin/user/UsersTable/UsersTable";
import { useGetAllUsersQuery } from "@/src/redux/features/user/userApi";
import Spinner from "@/src/components/ui/Spinner";
import { useState } from "react";

const page = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const { data, isLoading, isFetching } = useGetAllUsersQuery({
    page,
    limit,
    role: "user",
  });

  console.log(data);
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-11/12   mx-auto">
      <UsersTable
        columns={columns}
        data={data.users}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={data.totalPages}
        totalUsers={data.totalUsers}
        isFetching={isFetching}
      />
    </div>
  );
};

export default page;

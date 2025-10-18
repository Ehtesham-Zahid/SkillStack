"use client";
import { columns } from "@/src/components/features/admin/team/TeamsTable/columns";
import TeamsTable from "@/src/components/features/admin/team/TeamsTable/TeamsTable";
import { useGetAllUsersQuery } from "@/src/redux/features/user/userApi";
import Spinner from "@/src/components/ui/Spinner";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const { data, isLoading, isFetching } = useGetAllUsersQuery({
    page,
    limit,
    role: "admin",
  });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-11/12   mx-auto">
      <TeamsTable
        columns={columns}
        data={data?.users}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={data?.totalPages}
        totalTeam={data?.totalUsers}
        isFetching={isFetching}
      />
    </div>
  );
};

export default Page;

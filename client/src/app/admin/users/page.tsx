"use client";
import { columns } from "@/src/components/features/admin/user/UsersTable/columns";
import UsersTable from "@/src/components/features/admin/user/UsersTable/UsersTable";
import { useGetAllUsersQuery } from "@/src/redux/features/user/userApi";
import Spinner from "@/src/components/ui/Spinner";

const page = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  console.log(data);
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-11/12   mx-auto">
      <UsersTable columns={columns} data={data.users} />
    </div>
  );
};

export default page;

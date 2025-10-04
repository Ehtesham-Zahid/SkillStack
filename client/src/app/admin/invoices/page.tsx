"use client";
import { useGetAllOrdersAdminQuery } from "@/src/redux/features/order/orderApi";
import { columns } from "@/src/components/features/admin/invoice/InvoicesTable/columns";
import Spinner from "@/src/components/ui/Spinner";
import { useState } from "react";
import InvoicesTable from "@/src/components/features/admin/invoice/InvoicesTable/InvoicesTable";

const page = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const { data, isLoading, isFetching } = useGetAllOrdersAdminQuery({
    page,
    limit,
  });

  console.log(data);
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-11/12   mx-auto">
      <InvoicesTable
        columns={columns}
        data={data.orders}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={data.totalPages}
        totalInvoices={data.totalOrders}
        isFetching={isFetching}
      />
    </div>
  );
};

export default page;

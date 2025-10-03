"use client";

import { ColumnDef } from "@tanstack/react-table";

import CustomTable from "../../common/Table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  setPage: (page: number) => void;
  limit: string;
  setLimit: (limit: string) => void;
  totalPages: number;
  totalTeam: number;
  isFetching: boolean;
}

const TeamsTable = <TData, TValue>({
  columns,
  data,
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
  totalTeam,
  isFetching,
}: DataTableProps<TData, TValue>) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden p-5 bg-surface dark:bg-surface-dark rounded-md border dark:border-text2-dark border-text2  ">
        <div className="flex  flex-col gap-2">
          <h1 className="text-text1 dark:text-text1-dark text-4xl font-bold">
            Team Management
          </h1>
          <p className="text-text2 dark:text-text2-dark">
            Manage teams and their members.
          </p>
        </div>
        <CustomTable
          columns={columns}
          data={data}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalPages={totalPages}
          totalEntities={totalTeam}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default TeamsTable;

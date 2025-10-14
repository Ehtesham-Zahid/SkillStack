"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/shadcn/ui/table";
import { Button } from "@/src/shadcn/ui/button";
import { Pagination } from "@/src/shadcn/ui/pagination";
import { PaginationContent } from "@/src/shadcn/ui/pagination";
import { PaginationItem } from "@/src/shadcn/ui/pagination";
import { PaginationPrevious } from "@/src/shadcn/ui/pagination";
import { PaginationLink } from "@/src/shadcn/ui/pagination";
import { PaginationNext } from "@/src/shadcn/ui/pagination";
import { PaginationEllipsis } from "@/src/shadcn/ui/pagination";
import LimitSelector from "@/src/components/shared/LimitSelector";
import Spinner from "@/src/components/ui/Spinner";
import CustomTable from "../../common/Table";
import DataCard from "../../common/DataCard";
import { BookOpen, TrendingUp } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  setPage: (page: number) => void;
  limit: string;
  setLimit: (limit: string) => void;
  totalPages: number;
  totalUsers: number;
  isFetching: boolean;
}

const UsersTable = <TData, TValue>({
  columns,
  data,
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
  totalUsers,
  isFetching,
}: DataTableProps<TData, TValue>) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden p-5 bg-surface dark:bg-surface-dark rounded-md border dark:border-text2-dark border-text2  ">
        <div className="flex  flex-col gap-2">
          <h1 className="text-text1 dark:text-text1-dark text-4xl font-bold">
            User Management
          </h1>
          <p className="text-text2 dark:text-text2-dark">
            Manage users and their roles.
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
          totalEntities={totalUsers}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default UsersTable;

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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        {isFetching ? (
          <div className="flex items-center justify-center h-full my-20">
            <Spinner fullPage={false} />
          </div>
        ) : (
          <>
            <Table className="mt-5">
              <TableHeader className="dark:text-text2-dark text-text2">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="dark:text-text1-dark text-text1">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between py-4 w-full">
              {totalUsers > 1 && (
                <div className="flex items-center gap-2 text-sm w-fit">
                  <span>Show</span>
                  <LimitSelector
                    setLimit={setLimit}
                    defaultValue={limit}
                    setPage={setPage}
                  />
                  <span className="text-sm flex items-center text-nowrap">
                    entries of {totalUsers} total users
                  </span>
                </div>
              )}

              {totalPages > 0 && (
                <div className="flex items-center justify-center">
                  <Pagination className="dark:text-text2-dark text-text2">
                    <PaginationContent className="">
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() => {
                            let newPage: number = Math.max(page - 1, 1);
                            setPage(newPage as number);
                          }}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            onClick={() => setPage(index + 1)}
                            className={`${
                              page === index + 1 ? "active" : ""
                            }  dark:text-text1-dark text-text1`}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationEllipsis />
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() => {
                            let newPage: number = Math.min(
                              page + 1,
                              totalPages as number
                            );
                            setPage(newPage as number);
                          }}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersTable;

"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { Pagination } from "@/src/shadcn/ui/pagination";
import { PaginationContent } from "@/src/shadcn/ui/pagination";
import { PaginationItem } from "@/src/shadcn/ui/pagination";
import { PaginationPrevious } from "@/src/shadcn/ui/pagination";
import { PaginationLink } from "@/src/shadcn/ui/pagination";
import { PaginationNext } from "@/src/shadcn/ui/pagination";
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
  totalEntities: number;
  isFetching: boolean;
}

const CustomTable = <TData, TValue>({
  columns,
  data,
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
  totalEntities,
  isFetching,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return isFetching ? (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between py-4 w-full">
        {totalEntities > 10 && (
          <div className="flex items-center gap-2 text-sm w-fit">
            <span>Show</span>
            <LimitSelector
              setLimit={setLimit}
              defaultValue={limit}
              setPage={setPage}
            />
            <span className="text-sm flex items-center text-nowrap">
              entries out of {totalEntities}
            </span>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center">
            <Pagination className="dark:text-text2-dark text-text2">
              <PaginationContent className="">
                <PaginationItem className="hover:bg-surface dark:hover:bg-surface-dark">
                  <PaginationPrevious
                    href="#"
                    onClick={() => {
                      let newPage: number = Math.max(page - 1, 1);
                      setPage(newPage as number);
                    }}
                    className={`${
                      page === 1
                        ? "cursor-not-allowed dark:text-text2-dark text-text2  hover:bg-surface dark:hover:bg-surface-dark"
                        : "dark:text-text1-dark text-text1 hover:bg-surface dark:hover:bg-surface-dark"
                    }  `}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <PaginationItem
                    key={index}
                    className="hover:bg-surface dark:hover:bg-surface-dark"
                  >
                    <PaginationLink
                      href="#"
                      onClick={() => setPage(index + 1)}
                      className={`${
                        page === index + 1
                          ? "dark:text-primary-dark text-primary bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/10"
                          : "dark:text-text1-dark text-text1 hover:bg-surface dark:hover:bg-surface-dark"
                      }  `}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem className="hover:bg-surface dark:hover:bg-surface-dark">
                  <PaginationNext
                    href="#"
                    onClick={() => {
                      let newPage: number = Math.min(
                        page + 1,
                        totalPages as number
                      );
                      setPage(newPage as number);
                    }}
                    className={`${
                      page === totalPages
                        ? "cursor-not-allowed dark:text-text2-dark text-text2  hover:bg-surface dark:hover:bg-surface-dark"
                        : "dark:text-text1-dark text-text1 hover:bg-surface dark:hover:bg-surface-dark"
                    }  `}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomTable;

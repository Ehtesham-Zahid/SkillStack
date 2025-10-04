"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/src/utils/formatDate";
import { Badge } from "@/src/shadcn/ui/badge";
import { PencilIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import DeleteCourseButton from "../DeleteCourseButton";

// This type is used to define the shape of our data.
export interface Course {
  _id: string;
  name: string;
  ratings?: number;
  purchased?: number;
  createdAt: Date;
}

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "_id",
    header: "Course ID",
    cell: ({ row }) => {
      const courseId: string = row.getValue("_id");
      const id: string = courseId.substring(
        courseId.length - 3,
        courseId.length
      );

      return <div className="uppercase">CID{id}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "ratings",
    header: "Ratings",
    cell: ({ row }) => {
      const ratings: string = row.getValue("ratings");
      return (
        <div className="flex items-center gap-1">
          {ratings}
          <StarIcon
            className="w-3.5 h-3.5 text-yellow-500"
            fill="currentColor"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "purchased",
    header: "Purchased",
    cell: ({ row }) => {
      const purchased: string = row.getValue("purchased");
      return (
        <Badge className=" bg-green-100  text-green-600 font-bold capitalize">
          {purchased} Sales
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return <div>{formatDate(createdAt)}</div>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex gap-4 items-center">
          <Link
            className="cursor-pointer"
            href={`/admin/edit-course/${course._id}`}
          >
            <PencilIcon className="w-6 h-6 rounded-md p-1 dark:text-accent-dark text-accent dark:hover:bg-accent-dark/30 hover:bg-accent-dark/30 cursor-pointer" />
          </Link>
          <DeleteCourseButton course={course} />
        </div>
      );
    },
  },
];

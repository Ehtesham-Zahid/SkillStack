"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/src/utils/formatDate";
import { Badge } from "@/src/shadcn/ui/badge";
import { MessageCircleCodeIcon } from "lucide-react";

// This type is used to define the shape of our data.
export interface Order {
  _id: string;
  course: object;
  user: object;
  payment_info: object;
  createdAt: Date;
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => {
      const orderId: string = row.getValue("_id");
      const id: string = orderId.substring(orderId.length - 3, orderId.length);

      return <div className="uppercase">OID{id}</div>;
    },
  },
  {
    accessorKey: "user.name",
    header: "Customer Name",
    cell: ({ row }) => {
      const user: object = row.getValue("user");
      const name: string = user.name;
      return <div className="capitalize">{name || "N/A"}</div>;
    },
  },
  {
    accessorKey: "user.email",
    header: "Customer Email",
    cell: ({ row }) => {
      const user: object = row.getValue("user");
      const email: string = user.email;
      return <div className="capitalize">{email || "N/A"}</div>;
    },
  },
  {
    accessorKey: "course.name",
    header: "Course Name",
    cell: ({ row }) => {
      const course: object = row.getValue("course");
      const courseName: string = course.name;
      return <div className="capitalize">{courseName || "N/A"}</div>;
    },
  },
  {
    accessorKey: "course.price",
    header: "Price",
    cell: ({ row }) => {
      const course: object = row.getValue("course");
      const price: string = course.price;
      return (
        <Badge className="bg-green-100 text-green-600 font-bold capitalize">
          ${price || "N/A"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt") as string);

      return <div>{formatDate(createdAt)}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user: object = row.getValue("user");
      return (
        <div className="flex gap-4 items-center">
          <a href={`mailto:${user.email}`} title={`Email ${user.name}`}>
            <MessageCircleCodeIcon className="w-6 h-6 rounded-md p-1 dark:text-accent-dark text-accent dark:hover:bg-accent-dark/30 hover:bg-accent-dark/30 cursor-pointer" />
          </a>
        </div>
      );
    },
  },
];

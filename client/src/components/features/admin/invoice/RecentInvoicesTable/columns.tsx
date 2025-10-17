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
    accessorKey: "user",
    header: "Customer Name",
    cell: ({ row }) => {
      const user: any = row.getValue("user");
      const name: string = user.name;
      return <div className="capitalize">{name || "N/A"}</div>;
    },
  },
  {
    accessorKey: "course",
    header: "Course Name",
    cell: ({ row }) => {
      const course: object = row.getValue("course");
      const courseName: string = course.name;
      return <div className="capitalize">{courseName || "N/A"}</div>;
    },
  },
  {
    accessorKey: "course",
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
];

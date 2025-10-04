"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/src/utils/formatDate";
import { Badge } from "@/src/shadcn/ui/badge";
import { MessageCircleCodeIcon } from "lucide-react";

interface PaymentInfo {
  name: string;
  email: string;
  courseName: string;
  price: string;
}

// This type is used to define the shape of our data.
export interface Order {
  _id: string;
  courseId: string;
  userId: string;
  payment_info: PaymentInfo;
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
    accessorKey: "payment_info.name",
    header: "Customer Name",
    cell: ({ row }) => {
      const paymentInfo: PaymentInfo = row.getValue("payment_info");
      const name: string = paymentInfo.name;
      return <div className="capitalize">{name || "N/A"}</div>;
    },
  },
  {
    accessorKey: "payment_info.email",
    header: "Customer Email",
    cell: ({ row }) => {
      const paymentInfo: PaymentInfo = row.getValue("payment_info");
      const email: string = paymentInfo.email;
      return <div className="capitalize">{email || "N/A"}</div>;
    },
  },
  {
    accessorKey: "payment_info.courseName",
    header: "Course Name",
    cell: ({ row }) => {
      const paymentInfo: PaymentInfo = row.getValue("payment_info");
      const courseName: string = paymentInfo.courseName;
      return <div className="capitalize">{courseName || "N/A"}</div>;
    },
  },
  {
    accessorKey: "payment_info.price",
    header: "Price",
    cell: ({ row }) => {
      const paymentInfo: PaymentInfo = row.getValue("payment_info");
      const price: string = paymentInfo.price;
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
      const user = row.original;
      return (
        <div className="flex gap-4 items-center">
          <a
            href={`mailto:${user.payment_info.email}`}
            title={`Email ${user.payment_info.name}`}
          >
            <MessageCircleCodeIcon className="w-6 h-6 rounded-md p-1 dark:text-accent-dark text-accent dark:hover:bg-accent-dark/30 hover:bg-accent-dark/30 cursor-pointer" />
          </a>
        </div>
      );
    },
  },
];

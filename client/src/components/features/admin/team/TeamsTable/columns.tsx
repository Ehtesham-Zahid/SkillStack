"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/src/utils/formatDate";
import { Badge } from "@/src/shadcn/ui/badge";
import { MessageCircleCodeIcon } from "lucide-react";
import ChangeToUserButton from "../ChangeToUserButton";
import DeleteAdminButton from "../DeleteAdminButton";
// This type is used to define the shape of our data.
export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  courses: Array<{ courseId: string }>;
  provider: "manual" | "google" | "github";
  createdAt: Date;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "User ID",
    cell: ({ row }) => {
      const userId: string = row.getValue("_id");
      const id: string = userId.substring(userId.length - 3, userId.length);

      return <div className="uppercase">UID{id}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role: string = row.getValue("role");
      if (role === "admin") {
        return (
          <Badge className=" bg-red-100  text-red-600 font-bold capitalize">
            {role || "Admin"}
          </Badge>
        );
      } else if (role === "user") {
        return (
          <Badge className=" bg-blue-100  text-blue-600 font-bold capitalize">
            {role || "User"}
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => {
      const provider: string = row.getValue("provider");
      if (provider === "manual") {
        return (
          <Badge className=" bg-green-100  text-green-600 font-bold capitalize">
            {provider || "Manual"}
          </Badge>
        );
      } else if (provider === "google") {
        return (
          <Badge className=" bg-orange-100  text-orange-600 font-bold capitalize">
            {provider || "Google"}
          </Badge>
        );
      } else if (provider === "github") {
        return (
          <Badge className=" bg-gray-100  text-gray-600 font-bold capitalize">
            {provider || "Github"}
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "courses",
    header: "Enrolled Courses",
    cell: ({ row }) => {
      const courses: [] = row.getValue("courses");
      const enrolled: number = courses.length || 0;

      return <div className="">{enrolled} courses</div>;
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
          <>
            <DeleteAdminButton user={user} />
          </>
          <a href={`mailto:${user.email}`} title={`Email ${user.name}`}>
            <MessageCircleCodeIcon className="w-6 h-6 rounded-md p-1 dark:text-accent-dark text-accent dark:hover:bg-accent-dark/30 hover:bg-accent-dark/30 cursor-pointer" />
          </a>
        </div>
      );
    },
  },
  {
    id: "makeUser",
    header: "To User",
    cell: ({ row }) => {
      const user = row.original;
      return <ChangeToUserButton id={user._id} />;
    },
  },
];

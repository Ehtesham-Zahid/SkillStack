import React from "react";
import { useDeleteUserMutation } from "@/src/redux/features/user/userApi";
import { Loader2Icon, Trash2Icon } from "lucide-react";

const DeleteUserButton = ({ user }: { user: any }) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  return (
    <div>
      <>
        {isLoading ? (
          <Loader2Icon className="w-6 h-6 rounded-md p-1 dark:text-white text-white  cursor-pointer animate-spin" />
        ) : (
          <Trash2Icon
            onClick={() => handleDeleteUser(user._id)}
            className="w-6 h-6 rounded-md p-1 dark:text-destructive-dark text-destructive dark:hover:bg-destructive-dark/30 hover:bg-destructive-dark/30 cursor-pointer"
          />
        )}
      </>
    </div>
  );
};

export default DeleteUserButton;

import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDeleteUserMutation } from "@/src/redux/features/user/userApi";
import { Loader2Icon, Trash2Icon } from "lucide-react";

const DeleteAdminButton = ({ user }: { user: any }) => {
  const [deleteUser, { isLoading, error, isSuccess }] = useDeleteUserMutation();

  const handleDeleteAdmin = (id: string) => {
    deleteUser(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Admin deleted successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message || "Something went wrong");
      }
    }
  }, [isSuccess, error]);
  return (
    <div>
      <>
        {isLoading ? (
          <Loader2Icon className="w-6 h-6 rounded-md p-1 dark:text-destructive-dark text-destructive dark:hover:bg-destructive-dark/30 hover:bg-destructive-dark/30 cursor-pointer" />
        ) : (
          <Trash2Icon
            onClick={() => handleDeleteAdmin(user._id)}
            className="w-6 h-6 rounded-md p-1 dark:text-destructive-dark text-destructive dark:hover:bg-destructive-dark/30 hover:bg-destructive-dark/30 cursor-pointer"
          />
        )}
      </>
    </div>
  );
};

export default DeleteAdminButton;

import { useUpdateUserRoleMutation } from "@/src/redux/features/user/userApi";
import { Button } from "@/src/shadcn/ui/button";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";

const ChangeToAdminButton = ({ id }: { id: string }) => {
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();

  const handleUpdateUserRole = (id: string) => {
    updateUserRole({ id, role: "admin" });
  };

  return (
    <Button
      className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
      size="sm"
      onClick={() => handleUpdateUserRole(id)}
    >
      {isLoading ? (
        <Loader2Icon className="w-6 h-6 rounded-md p-1 dark:text-white text-white dark:hover:bg-white/30 hover:bg-white/30 cursor-pointer animate-spin" />
      ) : (
        <>
          Admin <ArrowUpIcon className="w-4 h-4" />
        </>
      )}
    </Button>
  );
};

export default ChangeToAdminButton;

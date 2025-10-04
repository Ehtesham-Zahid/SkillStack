import { useUpdateUserRoleMutation } from "@/src/redux/features/user/userApi";
import { Button } from "@/src/shadcn/ui/button";
import { ArrowDownIcon, Loader2Icon } from "lucide-react";

const ChangeToUserButton = ({ id }: { id: string }) => {
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();

  const handleUpdateUserRole = (id: string) => {
    updateUserRole({ id, role: "user" });
  };

  return (
    <Button
      className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
      size="sm"
      onClick={() => handleUpdateUserRole(id)}
    >
      {isLoading ? (
        <Loader2Icon className="w-6 h-6 rounded-md p-1 dark:text-white text-white dark:hover:bg-white/30 hover:bg-white/30 cursor-pointer animate-spin" />
      ) : (
        <>
          User <ArrowDownIcon className="w-4 h-4" />
        </>
      )}
    </Button>
  );
};

export default ChangeToUserButton;

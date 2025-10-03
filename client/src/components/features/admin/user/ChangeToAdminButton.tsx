import { Button } from "@/src/shadcn/ui/button";
import { ArrowUpIcon } from "lucide-react";

const ChangeToAdminButton = () => {
  return (
    <Button
      className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
      size="sm"
    >
      Admin <ArrowUpIcon className="w-4 h-4" />
    </Button>
  );
};

export default ChangeToAdminButton;

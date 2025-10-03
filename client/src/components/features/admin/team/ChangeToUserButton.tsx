import { Button } from "@/src/shadcn/ui/button";
import { ArrowDownIcon } from "lucide-react";

const ChangeToUserButton = () => {
  return (
    <Button
      className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
      size="sm"
    >
      User <ArrowDownIcon className="w-4 h-4" />
    </Button>
  );
};

export default ChangeToUserButton;

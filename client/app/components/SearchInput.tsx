import { Button } from "../shadcn/ui/button";
import { Input } from "../shadcn/ui/input";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex w-full  sm:max-w-sm mx-auto lg:mx-0 items-center gap-2">
      <input
        type="email"
        placeholder="Search"
        className="h-10 outline-primary rounded-md   px-3 w-full text-black border border-black"
      />
      <Button type="submit" variant="outline" className="h-10">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default SearchInput;

import { Button } from "../shadcn/ui/button";
import { Input } from "../shadcn/ui/input";
import { SearchIcon } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex w-full  sm:max-w-md mx-auto lg:mx-0 items-center gap-2">
      <input
        type="email"
        placeholder="Search"
        className="h-10 outline-primary rounded-md   px-3 w-full text-black  border-black py-6 dark:text-text1-dark  border-2  dark:bg-surface-dark dark:placeholder:text-text1-dark  dark:border-text1-dark"
      />
      {/* <Button
        type="submit"
        variant="outline"
        className="h-12 w-14 text-primary border-black font-bold hover:bg-zinc-200 cursor-pointer"
      > */}
      <SearchIcon
        size={32}
        className="cursor-pointer hover:bg-zinc-200 rounded-md   border-black text-black  font-bold border-2 p-2.5 h-12.5 w-15 dark:text-text1-dark  dark:bg-surface-dark dark:border-text1-dark   "
      />
      {/* </Button> */}
    </div>
  );
};

export default SearchInput;

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shadcn/ui/select";

type LimitSelectorProps = {
  setLimit: (limit: string) => void;
  defaultValue: string;
  setPage: (page: number) => void;
};

const LimitSelector = ({
  setLimit,
  defaultValue = "10",
  setPage,
}: LimitSelectorProps) => {
  const limitOptions = ["10", "25", "50", "100"];

  const handleChange = (value: string) => {
    setLimit(value);
    setPage(1);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full bg-background dark:bg-background-dark cursor-pointer border dark:border-text2-dark border-text2 text-text1 dark:text-text1-dark">
        <SelectValue placeholder="Select Limit" />
      </SelectTrigger>
      <SelectContent className="bg-background dark:bg-background-dark outline-none text-text1 dark:text-text1-dark border dark:border-text2-dark border-text2">
        <SelectGroup className="outline-none">
          {limitOptions.map((limit) => (
            <SelectItem key={limit} value={limit} className="hover:bg-sky-200">
              {limit}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LimitSelector;

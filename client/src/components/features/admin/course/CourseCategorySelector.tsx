import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shadcn/ui/select";

type CourseCategorySelectorProps = {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
};

const CourseCategorySelector = ({
  currentCategory,
  setCurrentCategory,
}: CourseCategorySelectorProps) => {
  return (
    <Select value={currentCategory} onValueChange={setCurrentCategory}>
      <SelectTrigger className="w-full dark:border-text2-dark border-text2 dark:text-text1-dark text-text1 py-5">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent className="dark:bg-background-dark bg-background">
        <SelectGroup>
          <SelectItem
            value="web-development"
            className="dark:hover:bg-surface-dark hover:bg-surface  "
          >
            Web Development
          </SelectItem>
          <SelectItem
            value="mobile-development"
            className="dark:hover:bg-surface-dark hover:bg-surface  "
          >
            Mobile Development
          </SelectItem>
          <SelectItem
            value="ai-development"
            className="dark:hover:bg-surface-dark hover:bg-surface  "
          >
            AI Development
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CourseCategorySelector;

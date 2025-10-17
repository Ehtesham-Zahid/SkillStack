import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shadcn/ui/select";
import { useGetCategoriesLayoutQuery } from "@/src/redux/features/layout/layoutApi";
import Spinner from "@/src/components/ui/Spinner";

type CourseCategorySelectorProps = {
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
};

const CourseCategorySelector = ({
  currentCategory,
  setCurrentCategory,
}: CourseCategorySelectorProps) => {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategoriesLayoutQuery();

  const categories = categoriesData?.layout?.categories;

  console.log("categories", categories);

  return categoriesLoading ? (
    <Spinner />
  ) : (
    <>
      <Select value={currentCategory} onValueChange={setCurrentCategory}>
        <SelectTrigger className="w-full dark:border-text2-dark border-text2 dark:text-text1-dark text-text1 py-5">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent className="dark:bg-background-dark bg-background">
          <SelectGroup>
            {categories.map((category: any) => (
              <SelectItem
                key={category._id}
                value={category.title}
                className="dark:hover:bg-surface-dark hover:bg-surface  "
              >
                {category.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default CourseCategorySelector;

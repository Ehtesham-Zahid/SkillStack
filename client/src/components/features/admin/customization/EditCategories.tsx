"use client";
import { Input } from "@/src/shadcn/ui/input";
import { useEffect, useState } from "react";
import { Label } from "@/src/shadcn/ui/label";
import { Separator } from "@/src/shadcn/ui/separator";
import { Button } from "@/src/shadcn/ui/button";
import Spinner from "@/src/components/ui/Spinner";
import { Textarea } from "@/src/shadcn/ui/textarea";
import { useGetLayoutByTypeQuery } from "@/src/redux/features/layout/layoutApi";
import { useEditLayoutMutation } from "@/src/redux/features/layout/layoutApi";
import { toast } from "react-hot-toast";
import { DeleteIcon, Loader2, Trash2Icon } from "lucide-react";

import isEqual from "lodash.isequal";
import { v4 as uuidv4 } from "uuid";

const EditCategories = () => {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetLayoutByTypeQuery({
      type: "Categories",
    });
  const [
    editLayout,
    {
      isLoading: editLayoutLoading,
      isSuccess: editLayoutSuccess,
      error: editLayoutError,
    },
  ] = useEditLayoutMutation();
  const [categories, setCategories] = useState<any>(
    categoriesData?.layout?.categories
  );

  useEffect(() => {
    if (categoriesData?.layout?.categories) {
      setCategories(categoriesData?.layout?.categories || []);
    }
  }, [categoriesData]);

  const handleSaveChanges = async () => {
    const data = { type: "Categories", categories: categories };

    await editLayout(data);
  };

  useEffect(() => {
    if (editLayoutSuccess) {
      toast.success("Changes saved successfully");
    }
    if (editLayoutError) {
      if ("data" in editLayoutError) {
        const errorMessage = editLayoutError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [editLayoutSuccess, editLayoutError]);

  const handleAddCategory = () => {
    const currentCategories = categories || [];
    if (currentCategories.length > 0) {
      const lastCategory = currentCategories[currentCategories.length - 1];
      const isTitleEmpty =
        !lastCategory?.title || String(lastCategory.title).trim() === "";
      if (isTitleEmpty) {
        toast.error(
          "Please fill the last category's title before adding a new one."
        );
        return;
      }
    }
    setCategories([
      ...currentCategories,
      {
        _id: uuidv4(),
        title: "Untitled Title",
      },
    ]);
  };

  const hasEmptyCategoryField = Array.isArray(categories)
    ? categories.some((item: any) => !String(item?.title || "").trim())
    : false;

  return (
    <div className="overflow-hidden p-5 bg-surface dark:bg-surface-dark rounded-md border dark:border-text2-dark border-text2  ">
      <div className="flex  flex-col gap-2">
        <h1 className="text-text1 dark:text-text1-dark text-4xl font-bold">
          Categories Section
        </h1>
        <p className="text-text2 dark:text-text2-dark">
          Customize your categories section.
        </p>
      </div>
      {categoriesLoading ? (
        <Spinner fullPage={false} className="mx-auto w-full" />
      ) : (
        <>
          <div className="flex flex-col gap-4 mt-8">
            {categories?.map((category: any, index: number) => (
              <div
                key={category._id}
                className="rounded-md border dark:border-text2-dark border-text2 bg-transparent hover:bg-primary/5 transition-colors p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="shrink-0 inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold">
                    #{index + 1}
                  </span>
                  <Input
                    value={category.title}
                    onChange={(e) => {
                      const updatedCategories = categories.map((item: any) =>
                        item._id === category._id
                          ? { ...item, title: e.target.value }
                          : item
                      );
                      setCategories(updatedCategories);
                    }}
                    placeholder="Category title"
                    className=" text-xl font-bold dark:text-text2-dark text-text2 focus:outline-none w-full bg-transparent"
                  />
                </div>
                <Trash2Icon
                  className="cursor-pointer w-4 h-4 dark:text-destructive-dark text-destructive"
                  onClick={() => {
                    const updatedCategories = categories.filter(
                      (item: any) => item._id !== category._id
                    );
                    setCategories(updatedCategories);
                  }}
                />
              </div>
            ))}
          </div>

          <Button
            onClick={handleAddCategory}
            className="w-full mt-8 bg-transparent text-primary-foreground  border border-primary border-dashed hover:bg-primary/10 text-primary cursor-pointer"
          >
            Add Category
          </Button>
          <Separator className="my-10" />
          <div className="flex justify-end gap-4 ">
            <Button
              variant="default"
              onClick={() => {
                setCategories(categoriesData?.layout?.categories || []);
              }}
              disabled={
                editLayoutLoading ||
                isEqual(categories, categoriesData?.layout?.categories)
              }
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                handleSaveChanges();
              }}
              disabled={
                editLayoutLoading ||
                isEqual(categories, categoriesData?.layout?.categories) ||
                hasEmptyCategoryField
              }
              className="cursor-pointer"
            >
              {hasEmptyCategoryField ? (
                "Complete All Fields"
              ) : editLayoutLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditCategories;

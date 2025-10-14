"use client";
import { useEffect, useState } from "react";
import { Label } from "@/src/shadcn/ui/label";
import { Separator } from "@/src/shadcn/ui/separator";
import { Button } from "@/src/shadcn/ui/button";
import Spinner from "@/src/components/ui/Spinner";
import { Textarea } from "@/src/shadcn/ui/textarea";
import { useGetBannerLayoutQuery } from "@/src/redux/features/layout/layoutApi";
import { useEditLayoutMutation } from "@/src/redux/features/layout/layoutApi";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const EditHero = () => {
  const { data: bannerData, isLoading: bannerLoading } =
    useGetBannerLayoutQuery();

  const [
    editLayout,
    {
      isLoading: editLayoutLoading,
      isSuccess: editLayoutSuccess,
      error: editLayoutError,
    },
  ] = useEditLayoutMutation();
  const [title, setTitle] = useState<string>(bannerData?.layout?.banner?.title);
  const [subtitle, setSubtitle] = useState<string>(
    bannerData?.layout?.banner?.subtitle
  );

  useEffect(() => {
    if (bannerData?.layout?.banner) {
      setTitle(bannerData.layout?.banner.title || "");
      setSubtitle(bannerData.layout?.banner.subtitle || "");
    }
  }, [bannerData]);

  const handleSaveChanges = async () => {
    console.log(title, subtitle);
    const data = { type: "Banner", title, subtitle };
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

  return (
    <div className="overflow-hidden p-5 bg-surface dark:bg-surface-dark rounded-md border dark:border-text2-dark border-text2  ">
      <div className="flex  flex-col gap-2">
        <h1 className="text-text1 dark:text-text1-dark text-4xl font-bold">
          Hero Section
        </h1>
        <p className="text-text2 dark:text-text2-dark">
          Customize your hero section.
        </p>
      </div>
      {bannerLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner fullPage={false} className="mx-auto" />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8 mt-5">
            <div className="flex flex-col gap-2 ">
              <Label className="text-text2 dark:text-text2-dark text-base">
                Hero Title
                <span className="dark:text-destructive-dark text-destructive">
                  *
                </span>
              </Label>
              <Textarea
                placeholder="Enter hero title"
                className="h-32 font-bold resize-none !text-xl placeholder:text-text1 dark:placeholder:text-text1-dark"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <p className="text-text2 dark:text-text2-dark text-sm">
                Main title of your hero section.
              </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <Label className="text-text2 dark:text-text2-dark text-base">
                Hero Subtitle
                <span className="dark:text-destructive-dark text-destructive">
                  *
                </span>
              </Label>
              <Textarea
                placeholder="Enter hero subtitle"
                className=" h-32 font-bold  resize-none placeholder:text-text1 dark:placeholder:text-text1-dark !text-xl"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
              <p className="text-text2 dark:text-text2-dark text-sm">
                Supporting text for the hero title.
              </p>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex justify-end gap-4 ">
            <Button
              variant="default"
              onClick={() => {
                setTitle(bannerData?.layout?.banner?.title || "");
                setSubtitle(bannerData?.layout?.banner?.subtitle || "");
              }}
              disabled={
                editLayoutLoading ||
                (title === bannerData?.layout?.banner?.title &&
                  subtitle === bannerData?.layout?.banner?.subtitle)
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
                (title === bannerData?.layout?.banner?.title &&
                  subtitle === bannerData?.layout?.banner?.subtitle)
              }
              className="  cursor-pointer"
            >
              {editLayoutLoading ? (
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

export default EditHero;

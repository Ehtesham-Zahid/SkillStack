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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shadcn/ui/accordion";
import { AccordionContent } from "@/src/shadcn/ui/accordion";
import isEqual from "lodash.isequal";
import { v4 as uuidv4 } from "uuid";

const EditFaqs = () => {
  const { data: faqsData, isLoading: faqsLoading } = useGetLayoutByTypeQuery({
    type: "Faqs",
  });
  const [
    editLayout,
    {
      isLoading: editLayoutLoading,
      isSuccess: editLayoutSuccess,
      error: editLayoutError,
    },
  ] = useEditLayoutMutation();
  const [faqs, setFaqs] = useState<any>(faqsData?.layout?.faq);

  useEffect(() => {
    if (faqsData?.layout?.faq) {
      setFaqs(faqsData?.layout?.faq || []);
    }
  }, [faqsData]);

  const handleSaveChanges = async () => {
    const data = { type: "Faqs", faq: faqs };

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

  const handleAddFaq = () => {
    const currentFaqs = faqs || [];
    if (currentFaqs.length > 0) {
      const lastFaq = currentFaqs[currentFaqs.length - 1];
      const isQuestionEmpty =
        !lastFaq?.question || String(lastFaq.question).trim() === "";
      const isAnswerEmpty =
        !lastFaq?.answer || String(lastFaq.answer).trim() === "";
      if (isQuestionEmpty || isAnswerEmpty) {
        toast.error(
          "Please fill the last FAQ's question and answer before adding a new one."
        );
        return;
      }
    }
    setFaqs([
      ...currentFaqs,
      {
        _id: uuidv4(),
        question: "Untitled Question",
        answer: "Untitled Answer",
      },
    ]);
  };

  return (
    <div className="overflow-hidden p-5 bg-surface dark:bg-surface-dark rounded-md border dark:border-text2-dark border-text2  ">
      <div className="flex  flex-col gap-2">
        <h1 className="text-text1 dark:text-text1-dark text-4xl font-bold">
          Faqs Section
        </h1>
        <p className="text-text2 dark:text-text2-dark">
          Customize your faqs section.
        </p>
      </div>
      {faqsLoading ? (
        <Spinner fullPage={false} className="mx-auto w-full" />
      ) : (
        <>
          <div className="flex flex-col gap-8 mt-8">
            {faqs?.map((faq: any) => (
              <Accordion
                type="single"
                collapsible
                key={faq._id}
                className="border-b"
              >
                <AccordionItem value={`item-${faq._id}`}>
                  <AccordionTrigger className="text-xl font-bold dark:text-text2-dark text-text2 flex items-center justify-between">
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const updatedFaqs = faqs.map((item: any) =>
                          item._id === faq._id
                            ? { ...item, question: e.target.value }
                            : item
                        );
                        setFaqs(updatedFaqs);
                      }}
                      className="p-0 text-xl font-bold dark:text-text2-dark text-text2 focus:outline-none w-full"
                    />
                    <div className="flex items-center gap-2">
                      <Trash2Icon
                        className="cursor-pointer w-4 h-4 dark:text-destructive-dark text-destructive"
                        onClick={() => {
                          const updatedFaqs = faqs.filter(
                            (item: any) => item._id !== faq._id
                          );
                          setFaqs(updatedFaqs);
                        }}
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => {
                        const updatedFaqs = faqs.map((item: any) =>
                          item._id === faq._id
                            ? { ...item, answer: e.target.value }
                            : item
                        );
                        setFaqs(updatedFaqs);
                      }}
                      className="h-32 font-bold resize-none !text-xl placeholder:text-text1 dark:placeholder:text-text1-dark"
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>

          <Button
            onClick={handleAddFaq}
            className="w-full mt-8 bg-transparent text-primary-foreground  border border-primary border-dashed hover:bg-primary/10 text-primary cursor-pointer"
          >
            Add Faq
          </Button>
          <Separator className="my-10" />
          <div className="flex justify-end gap-4 ">
            <Button
              variant="default"
              onClick={() => {
                setFaqs(faqsData?.layout?.faq || []);
              }}
              disabled={
                editLayoutLoading || isEqual(faqs, faqsData?.layout?.faq)
              }
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                handleSaveChanges();
              }}
              disabled={
                editLayoutLoading || isEqual(faqs, faqsData?.layout?.faq)
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

export default EditFaqs;

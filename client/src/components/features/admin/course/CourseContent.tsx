import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shadcn/ui/accordion";
import { Button } from "@/src/shadcn/ui/button";
import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/shadcn/ui/form";
import { Input } from "@/src/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/src/shadcn/ui/textarea";

type CourseContentProps = {
  currentStep: number;
  onStepChange: (nextStepIndex: number) => void;
  courseContentData: any;
  setCourseContentData: (data: any) => void;
};

const courseContentSchema = z.object({
  videoUrl: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  videoSection: z.string().min(1),
  videoLength: z.number().min(1),
  links: z.array(
    z.object({ title: z.string().min(1), url: z.string().min(1) })
  ),
  suggestion: z.string().min(1),
});

const CourseContent = ({
  currentStep,
  onStepChange,
  courseContentData,
  setCourseContentData,
}: CourseContentProps) => {
  const form = useForm({
    resolver: zodResolver(courseContentSchema),
    defaultValues: {
      videoUrl: courseContentData?.videoUrl || "",
      title: courseContentData?.title || "",
      description: courseContentData?.description || "",
      videoSection: courseContentData?.videoSection || "",
      videoLength: courseContentData?.videoLength || 0,
      links: courseContentData?.links || [],
      suggestion: courseContentData?.suggestion || "",
    },
  });
  return (
    <div className="w-full bg-surface dark:bg-surface-dark p-8 rounded-lg shadow-sm shadow-text1 dark:shadow-none">
      {" "}
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-4xl font-bold dark:text-text1-dark text-text1">
          Course Content
        </p>
        <p className=" dark:text-text2-dark text-text2 font-medium">
          Create sections and add video lessons for your course
        </p>
      </div>
      <div className="flex flex-col gap-5 w-full">
        {courseContentData.map((content: any, index: number) => (
          <Accordion
            type="single"
            collapsible
            key={index}
            className="border border-gray-200 rounded-md px-5 py-2 dark:border-text2-dark"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl  font-bold dark:text-text1-dark flex items-center">
                {content.videoSection}
              </AccordionTrigger>
              <AccordionContent>
                <Form {...form}>
                  <form
                    // onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Video Title"
                              {...field}
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-5 w-full">
                      <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Video Url</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Video Url"
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="videoLength"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Video Length</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Video Length"
                                {...field}
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Video Description"
                              {...field}
                              className="h-48"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Add Links */}
                    {content.links.map((link: any, index: number) => (
                      <FormField
                        control={form.control}
                        name={`links.${index}.title`}
                        render={({ field }) => (
                          <div className="flex flex-col gap-4 w-full border border-gray-200 rounded-md p-5">
                            <FormLabel className="text-base font-medium dark:text-text1-dark underline underline-offset-4">
                              Link {index + 1}
                            </FormLabel>
                            <div className="flex gap-5 w-full">
                              <FormItem className="flex-1">
                                <FormLabel>Link Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Link Title"
                                    {...field}
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                              <FormItem className="flex-1">
                                <FormLabel>Link Url</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Link Url"
                                    {...field}
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            </div>
                          </div>
                        )}
                      />
                    ))}
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        <Button className="w-full bg-transparent text-primary-foreground  border border-primary border-dashed hover:bg-primary/10 text-primary cursor-pointer">
          Add Section
        </Button>
      </div>
    </div>
  );
};

export default CourseContent;

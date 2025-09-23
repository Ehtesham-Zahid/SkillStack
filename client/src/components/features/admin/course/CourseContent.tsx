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
import { Separator } from "@/src/shadcn/ui/separator";
import { PlusIcon, Trash2, Trash2Icon, TrashIcon } from "lucide-react";

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

  const handleAddLesson = (sectionIndex: number) => {
    const updatedSections = [...courseContentData]; // shallow copy sections
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      lessons: [
        ...updatedSections[sectionIndex].lessons,
        {
          title: `Lesson ${updatedSections[sectionIndex].lessons.length + 1}`,
          description: "",
          videoUrl: "",
          videoLength: 0,
          videoPlayer: "vdocipher",
          suggestion: "",
          links: [],
        },
      ],
    };

    setCourseContentData(updatedSections);
  };

  const handleAddSection = () => {
    setCourseContentData([
      ...courseContentData,
      {
        title: "Untitled Section",
        description: "",
        lessons: [
          {
            title: "Untitled Lesson",
            description: "",
            videoUrl: "",
            videoLength: 0,
            videoPlayer: "vdocipher",
            suggestion: "",
            links: [{ title: "", url: "" }],
          },
        ],
      },
    ]);
  };

  const handleDeleteSection = (index: number) => {
    const updatedSections = [...courseContentData];
    updatedSections.splice(index, 1);
    setCourseContentData(updatedSections);
  };

  const handleDeleteLesson = (index: number, lessonIndex: number) => {
    const updatedSections = [...courseContentData];
    updatedSections[index].lessons.splice(lessonIndex, 1);
    setCourseContentData(updatedSections);
  };

  const handleAddLink = (index: number, lessonIndex: number) => {
    const updatedSections = [...courseContentData];
    updatedSections[index].lessons[lessonIndex].links.push({
      title: "",
      url: "",
    });
    setCourseContentData(updatedSections);
  };

  const handleDeleteLink = (
    index: number,
    lessonIndex: number,
    linkIndex: number
  ) => {
    const updatedSections = [...courseContentData];
    updatedSections[index].lessons[lessonIndex].links.splice(linkIndex, 1);
    setCourseContentData(updatedSections);
  };

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
        {courseContentData.map((section: any, index: number) => (
          <Accordion
            type="single"
            collapsible
            key={index}
            className="border border-gray-200 rounded-md px-5 py-2 dark:border-text2-dark"
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="  dark:text-text1-dark flex items-center justify-between hover:no-underline">
                <input
                  placeholder={`Section Title`}
                  type="text"
                  className="p-0 text-2xl font-bold  focus:outline-none"
                  value={section.title}
                  onChange={(e) => {
                    const updatedSections = [...courseContentData];
                    updatedSections[index].title = e.target.value;
                    setCourseContentData(updatedSections);
                  }}
                />
                {courseContentData.length > 1 && (
                  <div className="ml-auto">
                    <Trash2Icon
                      onClick={() => handleDeleteSection(index)}
                      className="w-4 h-4 cursor-pointer dark:text-destructive-dark text-destructive  "
                    />
                  </div>
                )}
              </AccordionTrigger>
              <AccordionContent className="mt-4 space-y-4">
                {section.lessons.map((lesson: any, lessonIndex: number) => (
                  <Accordion
                    type="single"
                    collapsible
                    key={lessonIndex}
                    className="border border-gray-200 rounded-md px-5 py-2 dark:border-text2-dark"
                  >
                    <AccordionItem value={`item-${lessonIndex}`}>
                      <AccordionTrigger className="text-base font-bold dark:text-text2-dark text-text2 flex items-center justify-between hover:no-underline">
                        <input
                          placeholder={`Lesson Title`}
                          type="text"
                          className="p-0 text-base font-bold  focus:outline-none"
                          value={lesson.title}
                          onChange={(e) => {
                            const updatedSections = [...courseContentData];
                            updatedSections[index].lessons[lessonIndex].title =
                              e.target.value;
                            setCourseContentData(updatedSections);
                          }}
                        />

                        {section.lessons.length > 1 && (
                          <div className="ml-auto">
                            <Trash2Icon
                              onClick={() =>
                                handleDeleteLesson(index, lessonIndex)
                              }
                              className="w-4 h-4 cursor-pointer dark:text-destructive-dark text-destructive  "
                            />
                          </div>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        {" "}
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
                                    <FormLabel>
                                      Video Length(in minutes)
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Video Length(in minutes)"
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
                            <div className="flex flex-col gap-4 w-full">
                              {/* Add Links */}
                              {lesson.links.map(
                                (link: any, linkIndex: number) => (
                                  <FormField
                                    control={form.control}
                                    name={`links.${linkIndex}.title`}
                                    render={({ field }) => (
                                      <div className="flex flex-col gap-4 w-full border border-text2-dark rounded-md p-5">
                                        <FormLabel className="text-base font-medium dark:text-accent-dark text-accent  flex items-center justify-between">
                                          Link {linkIndex + 1}
                                          {lesson.links.length > 1 && (
                                            <Trash2Icon
                                              onClick={() =>
                                                handleDeleteLink(
                                                  index,
                                                  lessonIndex,
                                                  linkIndex
                                                )
                                              }
                                              className="w-4 h-4 cursor-pointer dark:text-destructive-dark text-destructive  "
                                            />
                                          )}
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
                                )
                              )}
                              <p
                                onClick={() =>
                                  handleAddLink(index, lessonIndex)
                                }
                                className="text-sm font-medium dark:text-accent-dark text-accent cursor-pointer   flex items-center gap-2 hover:underline"
                              >
                                Add Link <PlusIcon className="w-4 h-4" />
                              </p>
                            </div>
                          </form>
                        </Form>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
                <p
                  onClick={() => handleAddLesson(index)}
                  className="text-sm font-medium text-primary cursor-pointer border-t border-text2 dark:border-text2-dark pt-4 flex items-center gap-2 hover:underline"
                >
                  Add New Lesson <PlusIcon className="w-4 h-4" />
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        <Button
          onClick={handleAddSection}
          className="w-full bg-transparent text-primary-foreground  border border-primary border-dashed hover:bg-primary/10 text-primary cursor-pointer"
        >
          Add Section
        </Button>
      </div>
    </div>
  );
};

export default CourseContent;

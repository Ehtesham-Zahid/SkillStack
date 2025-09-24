import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/shadcn/ui/accordion";
import { Button } from "@/src/shadcn/ui/button";

import { Input } from "@/src/shadcn/ui/input";
import { Textarea } from "@/src/shadcn/ui/textarea";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Label } from "@/src/shadcn/ui/label";
import { toast } from "react-hot-toast";
type CourseContentProps = {
  currentStep: number;
  onStepChange: (nextStepIndex: number) => void;
  courseContentData: any;
  setCourseContentData: (data: any) => void;
  handleSubmit: any;
};

// const courseContentSchema = z.object({
//   videoUrl: z.string().min(1),
//   title: z.string().min(1),
//   description: z.string().min(1),
//   videoSection: z.string().min(1),
//   videoLength: z.number().min(1),
//   links: z.array(
//     z.object({ title: z.string().min(1), url: z.string().min(1) })
//   ),
//   suggestion: z.string().min(1),
// });

const CourseContent = ({
  currentStep,
  onStepChange,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}: CourseContentProps) => {
  //   const form = useForm({
  //     resolver: zodResolver(courseContentSchema),
  //     defaultValues: {
  //       videoUrl: courseContentData?.videoUrl || "",
  //       title: courseContentData?.title || "",
  //       description: courseContentData?.description || "",
  //       videoSection: courseContentData?.videoSection || "",
  //       videoLength: courseContentData?.videoLength || 0,
  //       links: courseContentData?.links || [],
  //       suggestion: courseContentData?.suggestion || "",
  //     },
  //   });

  const handleAddLesson = (sectionIndex: number) => {
    if (
      courseContentData[sectionIndex].lessons[
        courseContentData[sectionIndex].lessons.length - 1
      ].title === "" ||
      courseContentData[sectionIndex].lessons[
        courseContentData[sectionIndex].lessons.length - 1
      ].videoUrl === "" ||
      courseContentData[sectionIndex].lessons[
        courseContentData[sectionIndex].lessons.length - 1
      ].videoLength === 0 ||
      courseContentData[sectionIndex].lessons[
        courseContentData[sectionIndex].lessons.length - 1
      ].description === ""
    ) {
      toast.error("Please fill all the fields of the last lesson");
      return;
    }

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
          links: [{ title: "", url: "" }],
        },
      ],
    };

    setCourseContentData(updatedSections);
  };

  const handleAddSection = () => {
    if (courseContentData[courseContentData.length - 1].title === "") {
      toast.error("Please fill the title of the last section");
      return;
    }
    if (
      courseContentData[courseContentData.length - 1].lessons[
        courseContentData[courseContentData.length - 1].lessons.length - 1
      ].title === "" ||
      courseContentData[courseContentData.length - 1].lessons[
        courseContentData[courseContentData.length - 1].lessons.length - 1
      ].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].lessons[
        courseContentData[courseContentData.length - 1].lessons.length - 1
      ].videoLength === 0 ||
      courseContentData[courseContentData.length - 1].lessons[
        courseContentData[courseContentData.length - 1].lessons.length - 1
      ].description === ""
    ) {
      toast.error("Please fill all the fields of the last lesson");
      return;
    }
    setCourseContentData([
      ...courseContentData,
      {
        title: "Untitled Section",
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
    if (
      courseContentData[index].lessons[lessonIndex].links[
        courseContentData[index].lessons[lessonIndex].links.length - 1
      ].title === "" ||
      courseContentData[index].lessons[lessonIndex].links[
        courseContentData[index].lessons[lessonIndex].links.length - 1
      ].url === ""
    ) {
      toast.error("Please fill all the fields of the last link");
      return;
    }
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

  const handlePrev = () => {
    onStepChange(currentStep - 1);
  };

  const handleNext = () => {
    if (courseContentData[courseContentData.length - 1].title === "") {
      toast.error("Please fill the title of the last section");
      return;
    }
    if (
      courseContentData[courseContentData.length - 1].lessons[
        courseContentData[courseContentData.length - 1].lessons.length - 1
      ].title === "" ||
      courseContentData[courseContentData.length - 1].lessons[
        courseContentData[courseContentData.length - 1].lessons.length - 1
      ].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].lessons[
        courseContentData[courseContentData.length - 1].lessons.length - 1
      ].videoLength === 0 ||
      courseContentData[courseContentData.length - 1].lessons[
        courseContentData[courseContentData.length - 1].lessons.length - 1
      ].description === ""
    ) {
      toast.error("Please fill all the fields of the last lesson");
      return;
    }
    handleCourseSubmit();
    onStepChange(currentStep + 1);
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
                        <p>{lesson.title}</p>
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
                        <form className="flex flex-col gap-8 w-full">
                          <div className="flex flex-col gap-2">
                            <Label>Video Title</Label>
                            <Input
                              placeholder="Video Title"
                              type="text"
                              value={lesson.title}
                              onChange={(e) => {
                                const updatedSections = [...courseContentData];
                                updatedSections[index].lessons[
                                  lessonIndex
                                ].title = e.target.value;
                                setCourseContentData(updatedSections);
                              }}
                            />
                          </div>

                          <div className="flex gap-5 w-full">
                            <div className="flex-1 flex flex-col gap-2">
                              <Label>Video Url</Label>
                              <Input
                                placeholder="Video Url"
                                type="text"
                                value={lesson.videoUrl}
                                onChange={(e) => {
                                  const updatedSections = [
                                    ...courseContentData,
                                  ];
                                  updatedSections[index].lessons[
                                    lessonIndex
                                  ].videoUrl = e.target.value;
                                  setCourseContentData(updatedSections);
                                }}
                              />
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                              <Label>Video Length(in minutes)</Label>
                              <Input
                                placeholder="Video Length(in minutes)"
                                type="number"
                                value={lesson.videoLength}
                                onChange={(e) => {
                                  const updatedSections = [
                                    ...courseContentData,
                                  ];
                                  updatedSections[index].lessons[
                                    lessonIndex
                                  ].videoLength = Number(e.target.value);
                                  setCourseContentData(updatedSections);
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label>Video Description</Label>
                            <Textarea
                              placeholder="Video Description"
                              className="h-48"
                              value={lesson.description}
                              onChange={(e) => {
                                const updatedSections = [...courseContentData];
                                updatedSections[index].lessons[
                                  lessonIndex
                                ].description = e.target.value;
                                setCourseContentData(updatedSections);
                              }}
                            />
                          </div>

                          <div className="flex flex-col gap-4 w-full">
                            {lesson.links.map(
                              (link: any, linkIndex: number) => (
                                <div className="flex flex-col gap-4 w-full border border-text2-dark rounded-md p-5">
                                  <div className="text-base font-medium dark:text-accent-dark text-accent  flex items-center justify-between">
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
                                  </div>
                                  <div className="flex gap-5 w-full">
                                    <div className="flex-1 flex flex-col gap-2">
                                      <Label>Link Title</Label>
                                      <Input
                                        placeholder="Link Title"
                                        type="text"
                                        value={link.title}
                                        onChange={(e) => {
                                          const updatedSections = [
                                            ...courseContentData,
                                          ];
                                          updatedSections[index].lessons[
                                            lessonIndex
                                          ].links[linkIndex].title =
                                            e.target.value;
                                          setCourseContentData(updatedSections);
                                        }}
                                      />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                      <Label>Link Url</Label>
                                      <Input
                                        placeholder="Link Url"
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => {
                                          const updatedSections = [
                                            ...courseContentData,
                                          ];
                                          updatedSections[index].lessons[
                                            lessonIndex
                                          ].links[linkIndex].url =
                                            e.target.value;
                                          setCourseContentData(updatedSections);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                            <p
                              onClick={() => handleAddLink(index, lessonIndex)}
                              className="text-sm font-medium dark:text-accent-dark text-accent cursor-pointer   flex items-center gap-2 hover:underline"
                            >
                              Add Link <PlusIcon className="w-4 h-4" />
                            </p>
                          </div>
                        </form>
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
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          onClick={handlePrev}
          className=" cursor-pointer mt-2 dark:text-text1-dark text-text1  text-base w-32  border dark:border-text2-dark border-text2   hover:border-primary dark:hover:border-primary-dark bg-transparent hover:bg-transparent"
          size="lg"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className=" cursor-pointer mt-2 text-white text-base w-32"
          size="lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CourseContent;

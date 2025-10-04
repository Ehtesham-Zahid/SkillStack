import React from "react";
import { useDeleteCourseMutation } from "@/src/redux/features/course/courseApi";
import { Loader2Icon, Trash2Icon } from "lucide-react";

const DeleteCourseButton = ({ course }: { course: any }) => {
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();

  const handleDeleteCourse = (id: string) => {
    deleteCourse(id);
  };

  return (
    <div>
      <>
        {isLoading ? (
          <Loader2Icon className="w-6 h-6 rounded-md p-1 dark:text-white text-white  cursor-pointer animate-spin" />
        ) : (
          <Trash2Icon
            onClick={() => handleDeleteCourse(course._id)}
            className="w-6 h-6 rounded-md p-1 dark:text-destructive-dark text-destructive dark:hover:bg-destructive-dark/30 hover:bg-destructive-dark/30 cursor-pointer"
          />
        )}
      </>
    </div>
  );
};

export default DeleteCourseButton;

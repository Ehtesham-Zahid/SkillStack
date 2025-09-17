import Image from "next/image";
const CourseCard = () => {
  return (
    <div className="w-full bg-surface dark:bg-surface-dark  rounded-md flex flex-col gap-3">
      <Image
        src="/images/course-thumbnail.webp"
        alt="Course Card"
        width={500}
        height={500}
        className="w-full h-full object-cover rounded-t-md"
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Image
            src="/images/user3.jpg"
            alt="Profile Image"
            width={32}
            height={32}
            className="w-8 h-8 object-cover rounded-full border border-gray-200 dark:border-gray-700"
          />
          <p className="text-sm text-gray-400">Ehtesham Zahid</p>
        </div>
        <h1 className="text-xl font-bold mb-3">
          HTML for Programmers: Build Your Web Basics Right
        </h1>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm text-gray-400">Stars</p>
          <p className="text-sm text-gray-400">(4.9)</p>
        </div>
        <div className="flex items-center justify-between gap-2  border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
          <div className="text-sm text-gray-400">3 Students</div>
          <div className="text-sm text-gray-400">10 Lessons</div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

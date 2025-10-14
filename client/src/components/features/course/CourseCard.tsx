import Image from "next/image";
import Ratings from "@/src/components/shared/Ratings";
import Link from "next/link";

type CourseCardProps = {
  id: string;
  title: string;
  author: string;
  price: number | string;
  students: number;
  lessons: number;
  rating: number;
  thumbnailSrc?: string;
  authorAvatarSrc?: string;
  accent?: "primary" | "success" | "accent";
  enrolled?: boolean;
};

const CourseCard = ({
  id,
  title,
  author,
  price,
  students,
  lessons,
  rating,
  thumbnailSrc = "/images/course-thumbnail.webp",
  authorAvatarSrc = "/images/user3.jpg",
  accent = "accent",
  enrolled = false,
}: CourseCardProps) => {
  const accentMap: Record<string, string> = {
    primary: "from-[var(--color-primary)]",
    success: "from-[var(--color-success)]",
    accent: "from-[var(--color-accent)]",
  };

  const accentDarkMap: Record<string, string> = {
    primary: "from-[var(--color-primary-dark)]",
    success: "from-[var(--color-success-dark)]",
    accent: "from-[var(--color-accent-dark)]",
  };

  return (
    <Link
      href={enrolled ? `/course-access/${id}` : `/courses/${id}`}
      className="group w-full rounded-xl overflow-hidden border dark:border-text2-dark border-text2 bg-surface dark:bg-surface-dark transition-all hover:shadow-lg"
    >
      <div className="relative">
        <Image
          src={thumbnailSrc}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-56 object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-tr to-transparent opacity-60 transition-opacity group-hover:opacity-70 ${accentMap[accent]} dark:${accentDarkMap[accent]}`}
        />
        <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-surface dark:bg-surface-dark/90 border dark:border-text2-dark border-text2 text-text1 dark:text-text1-dark">
          ${price}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={authorAvatarSrc}
            alt={author}
            width={32}
            height={32}
            className="w-8 h-8 object-cover rounded-full border border-text2 dark:border-text2-dark"
          />
          <p className="text-sm text-text2 dark:text-text2-dark">{author}</p>
        </div>
        <h3 className="text-xl font-bold text-text1 dark:text-text1-dark mb-2 line-clamp-2">
          {title}
        </h3>
        <Ratings rating={rating} size={18} className="mb-3" />
        <div className="flex items-center justify-between gap-2 border-t dark:border-text2-dark border-text2 pt-3 mt-3">
          <div className="text-sm text-text2 dark:text-text2-dark">
            {students} Students
          </div>
          <div className="text-sm text-text2 dark:text-text2-dark">
            {lessons} Lessons
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

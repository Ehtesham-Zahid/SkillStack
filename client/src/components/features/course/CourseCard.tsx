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
  discountedPrice?: number | string;
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
  discountedPrice,
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

  // Function to calculate discount percentage
  const calculateDiscountPercentage = (
    originalPrice: number | string,
    salePrice: number | string
  ): number => {
    const original = Number(originalPrice);
    const sale = Number(salePrice);

    if (original <= 0 || sale >= original) return 0;

    const discount = ((original - sale) / original) * 100;
    return Math.round(discount);
  };

  const hasDiscount = discountedPrice && discountedPrice !== price;
  const displayDiscountPercentage = hasDiscount
    ? calculateDiscountPercentage(price, discountedPrice as number)
    : 0;

  return (
    <Link
      href={enrolled ? `/course-access/${id}` : `/courses/${id}`}
      className="group w-full bg-surface dark:bg-surface-dark rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={thumbnailSrc}
          alt={title}
          width={400}
          height={225}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Discount Badge */}
        {hasDiscount && displayDiscountPercentage > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
              -{displayDiscountPercentage}%
            </span>
          </div>
        )}

        {/* Enrolled Badge */}
        {enrolled && (
          <div className="absolute top-3 left-3">
            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
              Enrolled
            </span>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-surface/90 dark:bg-surface-dark/90 text-gray-900 dark:text-white text-sm font-semibold px-2 py-1 rounded shadow-sm">
            ${hasDiscount ? discountedPrice : price}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={authorAvatarSrc}
            alt={author}
            width={24}
            height={24}
            className="w-6 h-6 object-cover rounded-full border border-gray-200 dark:border-gray-600"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {author}
          </span>
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Ratings rating={rating} size={14} />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {lessons} lessons
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${discountedPrice}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                ${price}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {students} students
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

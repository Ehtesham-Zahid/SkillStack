import Image from "next/image";
import Ratings from "@/src/components/shared/Ratings";
import { TESTIMONIALS } from "@/src/constants";

const TestimonialsSection = () => {
  return (
    <section className="overflow-hidden py-16 w-11/12  lg:w-11/12 2xl:w-5/6 mx-auto">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text1 dark:text-text1-dark">
          Our Students Are{" "}
          <span className="text-primary dark:text-primary-dark">
            Our Strength
          </span>
        </h2>
        <p className="mt-4 text-text2 dark:text-text2-dark">
          Discover what our students have to say about their learning journey
          with us. Their success stories inspire us to keep delivering
          exceptional learning experiences.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {TESTIMONIALS.map((t) => (
          <article
            key={t.id}
            className="rounded-xl border dark:border-text2-dark border-text2 bg-surface dark:bg-surface-dark p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <Image
                src={t.avatar}
                alt={t.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border dark:border-text2-dark border-text2"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text1 dark:text-text1-dark">
                  {t.name}
                </h3>
                <p className="text-sm text-text2 dark:text-text2-dark">
                  {t.role}
                </p>
                <Ratings rating={t.rating} size={16} className="mt-2" />
              </div>
            </div>
            <p className="mt-4 text-text2 dark:text-text2-dark leading-relaxed">
              {t.quote}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;

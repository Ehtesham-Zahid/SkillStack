import { Card, CardContent } from "@/src/shadcn/ui/card";
import { Users, Wallet, MonitorSmartphone } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="overflow-hidden py-16 w-11/12  lg:w-11/12 2xl:w-5/6 mx-auto">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-[clamp(28px,5vw,52px)] font-extrabold tracking-tight text-text1 dark:text-text1-dark">
          Welcome to{" "}
          <span className="text-primary dark:text-primary-dark">
            Skill<span className="text-text1 dark:text-text1-dark">Stack</span>
          </span>
        </h1>
        <p className="mt-4 text-text2 dark:text-text2-dark text-base sm:text-lg">
          Your journey to becoming a confident programmer starts here. Discover
          simple, affordable, and community‑driven learning designed for
          everyone.
        </p>
      </div>

      {/* Highlights */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Expert Instructors */}
        <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <MonitorSmartphone className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-text1 dark:text-text1-dark">
              Expert Instructors
            </h3>
            <p className="text-sm text-text2 dark:text-text2-dark max-w-sm bg-surface/60 dark:bg-surface-dark/60 rounded-md px-4 py-3">
              Learn from passionate mentors and industry professionals who care
              about your growth.
            </p>
          </CardContent>
        </Card>

        {/* Affordable Access */}
        <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-text1 dark:text-text1-dark">
              Affordable Access
            </h3>
            <p className="text-sm text-text2 dark:text-text2-dark max-w-sm bg-surface/60 dark:bg-surface-dark/60 rounded-md px-4 py-3">
              Unlock high‑quality programming courses and resources at prices
              everyone can afford.
            </p>
          </CardContent>
        </Card>

        {/* Community Support */}
        <Card className="bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark">
          <CardContent className="p-6 flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-text1 dark:text-text1-dark">
              Community Support
            </h3>
            <p className="text-sm text-text2 dark:text-text2-dark max-w-sm bg-surface/60 dark:bg-surface-dark/60 rounded-md px-4 py-3">
              Join a friendly network of learners and experts ready to help you
              succeed.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mission */}
      <div className="mt-12 px-4">
        <p className="text-center text-text2 dark:text-text2-dark text-base sm:text-lg max-w-5xl mx-auto">
          At{" "}
          <span className="text-primary dark:text-primary-dark font-semibold">
            Skill<span className="text-text1 dark:text-text1-dark">Stack</span>
          </span>
          , our mission is to make programming accessible and enjoyable for
          everyone. Whether you're just starting out or advancing your skills,
          we're here to support your growth every step of the way.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;

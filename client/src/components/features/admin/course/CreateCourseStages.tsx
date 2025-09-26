import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CreateCourseStagesProps = {
  currentStep?: number; // 0-based index
  completedSteps?: boolean[]; // length 4, true if step is completed
  onStepChange?: (nextStepIndex: number) => void; // called when user selects an allowed step
  className?: string;
};

const STEP_TITLES = [
  "Course Information",
  "Course Options",
  "Course Content",
  "Course Preview",
];

const STEP_SUBTITLES = [
  "Basic details",
  "Benefits & prerequisites",
  "Videos & materials",
  "Review & publish",
];

const CreateCourseStages: React.FC<CreateCourseStagesProps> = ({
  currentStep = 0,
  completedSteps,
  onStepChange,
  className,
}) => {
  const safeCompleted = React.useMemo(() => {
    const base = Array(STEP_TITLES.length).fill(false) as boolean[];
    if (!completedSteps) return base;
    return base.map((_, i) => Boolean(completedSteps[i]));
  }, [completedSteps]);

  const isStepUnlocked = (index: number) => {
    // You can always select current or any previous completed step
    if (index <= currentStep) return true;
    // You can move forward only to the immediate next step if current is completed
    if (index === currentStep + 1) return Boolean(safeCompleted[currentStep]);
    // Further steps are locked unless all previous are completed
    for (let i = 0; i < index; i++) {
      if (!safeCompleted[i]) return false;
    }
    return true;
  };

  const handleSelect = (index: number) => {
    if (currentStep < index) return;
    onStepChange?.(index);
  };

  return (
    <aside
      className={cn(
        "w-full bg-surface dark:bg-surface-dark rounded-xl border border-border dark:border-border-dark shadow-lg hover:shadow-xl transition-all duration-300",
        "sm:sticky sm:top-24 backdrop-blur-sm",
        className
      )}
    >
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2  ">
        <div className="text-left">
          <h3 className="text-2xl font-bold text-text1 dark:text-text1-dark mb-1">
            Course Updation Steps
          </h3>
          <p className="text-sm text-text2 dark:text-text2-dark">
            Complete each step to Create your course
          </p>
        </div>
      </div>
      <div className="p-4 sm:p-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
        {/* Vertical layout for screens below sm (mobile) */}
        <div className="sm:hidden">
          <div className="space-y-3">
            {STEP_TITLES.map((title, index) => {
              const isCurrent = index === currentStep;
              const isCompleted = safeCompleted[index];
              const unlocked = isStepUnlocked(index);

              return (
                <div
                  key={title}
                  className="relative flex items-center gap-4 pb-6 last:pb-0"
                  onClick={() => handleSelect(index)}
                >
                  {/* Circle with step number or checkmark */}
                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={() => handleSelect(index)}
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-sm font-semibold hover:scale-105",
                        index < currentStep
                          ? "bg-primary border-primary text-white shadow-primary/25 hover:shadow-primary/40"
                          : isCurrent
                          ? "bg-primary/10 border-primary text-primary shadow-primary/10 hover:bg-primary/20"
                          : "bg-surface dark:bg-surface-dark border-border dark:border-border-dark text-muted-foreground hover:border-primary/50 hover:bg-primary/5",
                        !unlocked &&
                          "cursor-not-allowed opacity-50 hover:scale-100"
                      )}
                      disabled={!unlocked}
                      aria-current={isCurrent ? "step" : undefined}
                      aria-disabled={!unlocked}
                    >
                      {index < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-sm">{index + 1}</span>
                      )}
                    </button>
                  </div>

                  {/* Step content */}
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => handleSelect(index)}
                      className={cn(
                        "text-left transition-all duration-200 hover:text-primary",
                        isCurrent
                          ? "text-primary"
                          : "text-text1 dark:text-text1-dark",
                        !unlocked &&
                          "cursor-not-allowed opacity-50 hover:text-text1 dark:hover:text-text1-dark"
                      )}
                      disabled={!unlocked}
                    >
                      <div className="text-sm font-semibold tracking-wide">
                        {title}
                      </div>
                      <div className="text-xs text-muted-foreground dark:text-muted-foreground-dark mt-0.5">
                        {STEP_SUBTITLES[index]}
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Horizontal layout for sm and above */}
        <div className="hidden sm:block">
          <div className="flex justify-between">
            {STEP_TITLES.map((title, index) => {
              const isCurrent = index === currentStep;
              const isCompleted = safeCompleted[index];
              const unlocked = isStepUnlocked(index);

              return (
                <div
                  key={title}
                  className="relative flex flex-col items-center gap-2 group flex-1"
                  onClick={() => handleSelect(index)}
                >
                  {/* Circle with step number or checkmark */}
                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={() => handleSelect(index)}
                      className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 shadow-sm group-hover:scale-110 font-semibold",
                        index < currentStep
                          ? "bg-primary border-primary text-white shadow-primary/25 group-hover:shadow-primary/40"
                          : isCurrent
                          ? "bg-primary/10 border-primary text-primary shadow-primary/10 group-hover:bg-primary/20"
                          : "bg-surface dark:bg-surface-dark border-border dark:border-border-dark text-muted-foreground hover:border-primary/50 hover:bg-primary/5",
                        !unlocked &&
                          "cursor-not-allowed opacity-50 group-hover:scale-100"
                      )}
                      disabled={!unlocked}
                      aria-current={isCurrent ? "step" : undefined}
                      aria-disabled={!unlocked}
                    >
                      {index < currentStep ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-base">{index + 1}</span>
                      )}
                    </button>
                  </div>

                  {/* Step content */}
                  <div className="text-center flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => handleSelect(index)}
                      className={cn(
                        "text-sm font-semibold transition-all duration-200 group-hover:text-primary group-hover:scale-105",
                        isCurrent
                          ? "text-primary"
                          : "text-text1 dark:text-text1-dark",
                        !unlocked &&
                          "cursor-not-allowed opacity-50 group-hover:text-text1 dark:group-hover:text-text1-dark group-hover:scale-100"
                      )}
                      disabled={!unlocked}
                    >
                      {title}
                    </button>
                    <span className="text-xs text-muted-foreground dark:text-muted-foreground-dark">
                      {STEP_SUBTITLES[index]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CreateCourseStages;

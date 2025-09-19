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
  "COURSE INFORMATION",
  "COURSE OPTIONS",
  "COURSE CONTENT",
  "COURSE PREVIEW",
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
        "w-full lg:w-80 xl:w-96 lg:sticky lg:top-24 self-start",
        className
      )}
    >
      <div className=" p-5">
        <div className="relative">
          {/* Main vertical line connecting all steps */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border dark:bg-input" />

          {/* Progress line - only shows up to current step */}
          <div
            className="absolute left-4 top-4 w-0.5 bg-primary transition-all duration-300"
            style={{
              height: `${(currentStep / (STEP_TITLES.length - 1)) * 75}%`,
            }}
          />

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
                {/* Circle with checkmark */}
                <div className="relative z-10">
                  <button
                    type="button"
                    onClick={() => handleSelect(index)}
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
                      isCurrent || isCompleted
                        ? "bg-primary border-primary text-white"
                        : "bg-background dark:bg-background-dark border-border dark:border-input text-muted-foreground",
                      !unlocked && "cursor-not-allowed opacity-50"
                    )}
                    disabled={!unlocked}
                    aria-current={isCurrent ? "step" : undefined}
                    aria-disabled={!unlocked}
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>

                {/* Step title */}
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => handleSelect(index)}
                    className={cn(
                      "text-left text-sm font-semibold tracking-wide transition-colors duration-200",
                      isCurrent
                        ? "text-primary"
                        : "text-text1 dark:text-text1-dark",
                      !unlocked && "cursor-not-allowed opacity-50"
                    )}
                    disabled={!unlocked}
                  >
                    {title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default CreateCourseStages;

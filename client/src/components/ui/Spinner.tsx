import React from "react";

interface SpinnerProps {
  size?: "small" | "medium" | "large" | "xlarge";
  fullPage?: boolean;
  className?: string;
}

const Spinner = ({
  size = "large",
  fullPage = true,
  className = "",
}: SpinnerProps) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xlarge: "w-16 h-16",
  };

  const spinnerVisual = (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} border-4 border-surface dark:border-surface-dark rounded-full animate-spin`}
      >
        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
      <div className="absolute inset-2 border-2 border-primary/30 dark:border-primary/40 rounded-full animate-pulse"></div>
      <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinnerVisual}
      </div>
    );
  }

  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex items-center ${className}`}
    >
      {spinnerVisual}
      <span className="sr-only">Loading...</span>
    </span>
  );
};

export default Spinner;

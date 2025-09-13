import React from "react";

const Spinner = ({ size = "large" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xlarge: "w-16 h-16",
  };

  return (
    <div className="fixed inset-0 bg-background/80 dark:bg-background-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Main Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div
          className={`${sizeClasses[size]} border-4 border-surface dark:border-surface-dark rounded-full animate-spin`}
        >
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>

        {/* Inner Pulse */}
        <div className="absolute inset-2 border-2 border-primary/30 dark:border-primary/40 rounded-full animate-pulse"></div>

        {/* Center Dot */}
        <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Spinner;

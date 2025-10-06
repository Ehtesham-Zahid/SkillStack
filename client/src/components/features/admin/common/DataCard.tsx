import React from "react";
import { LucideIcon } from "lucide-react";

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color?: "primary" | "success" | "accent" | "destructive";
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  icon: Icon,
  color = "primary",
  trend,
  className = "",
}) => {
  const colorClasses = {
    primary: "text-primary",
    success: "text-success dark:text-success-dark",
    accent: "text-accent dark:text-accent-dark",
    destructive: "text-destructive dark:text-destructive-dark",
  };

  const bgColorClasses = {
    primary: "bg-primary/10 border-primary/20",
    success:
      "bg-success/10 border-success/20 dark:bg-success-dark/10 dark:border-success-dark/20",
    accent:
      "bg-accent/10 border-accent/20 dark:bg-accent-dark/10 dark:border-accent-dark/20",
    destructive:
      "bg-destructive/10 border-destructive/20 dark:bg-destructive-dark/10 dark:border-destructive-dark/20",
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border-2 p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
        bg-surface dark:bg-surface-dark border-text2 dark:border-text2-dark
        ${bgColorClasses[color]}
        ${className}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-current to-transparent"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 rounded-full bg-gradient-to-tr from-current to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={`p-2 rounded-lg ${bgColorClasses[color]}`}>
                <Icon className={`w-5 h-5 ${colorClasses[color]}`} />
              </div>
            )}
            <h3 className="text-sm font-medium text-text2 dark:text-text2-dark uppercase tracking-wider">
              {title}
            </h3>
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                trend.isPositive
                  ? "text-success dark:text-success-dark bg-success/10 dark:bg-success-dark/10"
                  : "text-destructive dark:text-destructive-dark bg-destructive/10 dark:bg-destructive-dark/10"
              }`}
            >
              <span>{trend.isPositive ? "↗" : "↘"}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-2">
          <span
            className={`text-4xl font-bold ${colorClasses[color]} drop-shadow-sm`}
          >
            {value}
          </span>
        </div>

        {/* Optional Description */}
        <div className="text-xs text-text2 dark:text-text2-dark/70">
          {trend && (
            <span>
              {trend.isPositive ? "Increased" : "Decreased"} from last period
            </span>
          )}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-[0.02] pointer-events-none`}
      ></div>
    </div>
  );
};

export default DataCard;

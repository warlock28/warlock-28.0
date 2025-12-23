import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Centralized loading spinner component
 * Used consistently across the entire application
 */
export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-12 h-12 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={cn(
        "border-primary/30 border-t-primary rounded-full animate-spin",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * Centered loading spinner for sections
 */
export const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <LoadingSpinner size="md" />
  </div>
);

/**
 * Inline loading spinner for buttons
 */
export const ButtonLoader = () => (
  <LoadingSpinner size="sm" className="mr-2" />
);

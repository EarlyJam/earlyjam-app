import { forwardRef, TextareaHTMLAttributes } from "react";

import { cn } from "@/utils/index";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        rows={5}
        className={cn(
          // Match Input styles for consistency
          "flex min-h-[80px] w-full rounded-lg border border-gray-400-disable bg-background px-3 py-2 text-sm text-gray-800 shadow-ej-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

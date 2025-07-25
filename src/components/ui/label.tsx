import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/index";

import type { VariantProps } from "class-variance-authority";

const labelVariants = cva(
  "text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-blue-secondary-dark"
);

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

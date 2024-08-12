import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode
} from "react";

import { Fallback, Image, Root } from "@radix-ui/react-avatar";
import { TooltipArrow } from "@radix-ui/react-tooltip";

import { cn } from "@/utils/index";

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const Avatar = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & { tooltip?: ReactNode }
>(({ className, tooltip, ...props }, ref) => {
  const Component = (
    <Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger>{Component}</TooltipTrigger>
        <TooltipContent className="rounded-sm border-none bg-blue-primary-500 p-2 text-sm text-white shadow-none">
          {tooltip}
          <TooltipArrow className="fill-blue-primary-500" />
        </TooltipContent>
      </Tooltip>
    );
  }

  return Component;
});
Avatar.displayName = Root.displayName;

const AvatarImage = forwardRef<
  ElementRef<typeof Image>,
  ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => (
  <Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = Image.displayName;

const AvatarFallback = forwardRef<
  ElementRef<typeof Fallback>,
  ComponentPropsWithoutRef<typeof Fallback>
>(({ className, ...props }, ref) => (
  <Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };

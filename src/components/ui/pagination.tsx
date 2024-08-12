import { ComponentProps, forwardRef } from "react";

import {
  LuChevronLeft,
  LuChevronRight,
  LuMoreHorizontal
} from "react-icons/lu";

import { cn } from "@/utils/index";

const Pagination = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("flex justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  )
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
} & ComponentProps<"div">;

const PaginationLink = ({
  className,
  isActive,
  onClick,
  ...props
}: PaginationLinkProps) => (
  <div
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "flex h-8 w-8 cursor-pointer items-center justify-center text-sm font-normal text-gray-600-secondary",
      { "rounded-full bg-primary text-black": isActive },
      className
    )}
    onClick={props.disabled ? undefined : onClick}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  showLabel,
  disabled,
  ...props
}: ComponentProps<typeof PaginationLink> & {
  showLabel?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("mr-1 h-5 w-5 gap-1", className)}
    {...props}
    disabled={disabled}
  >
    <LuChevronLeft
      className={cn("h-5 w-5", { "text-gray-400-disable": disabled })}
    />
    {showLabel && <span>Previous</span>}
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  showLabel,
  disabled,
  ...props
}: ComponentProps<typeof PaginationLink> & {
  showLabel?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("ml-1 h-5 w-5 gap-1", className)}
    {...props}
    disabled={disabled}
  >
    {showLabel && <span>Next</span>}
    <LuChevronRight
      className={cn("h-5 w-5", { "text-gray-400-disable": disabled })}
    />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-8 w-8 items-center justify-center text-gray-600-secondary",
      className
    )}
    {...props}
  >
    <LuMoreHorizontal className="h-5 w-5" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
};

import { cn } from "@/utils";

type AppHeaderSpacingProps = {
  className?: string;
};

function AppHeaderSpacing(props: AppHeaderSpacingProps) {
  const { className } = props;

  return (
    <div
      className={cn(
        "h-app-header-mobile w-full shrink-0 sm:h-app-header",
        className
      )}
    />
  );
}

export default AppHeaderSpacing;

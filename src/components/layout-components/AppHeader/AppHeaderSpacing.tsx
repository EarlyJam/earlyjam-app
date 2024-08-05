import { cn } from "@/utils";

type AppHeaderSpacingProps = {
  className?: string;
};

function AppHeaderSpacing(props: AppHeaderSpacingProps) {
  const { className } = props;

  return (
    <div
      className={cn(
        "h-app-header-mobile sm:h-app-header w-full shrink-0",
        className,
      )}
    />
  );
}

export default AppHeaderSpacing;

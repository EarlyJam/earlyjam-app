import { cn } from "@/utils";

type SideNavSpacingProps = {
  className?: string;
};

function SideNavSpacing(props: SideNavSpacingProps) {
  const { className } = props;

  return <div className={cn("w-side-nav h-px shrink-0", className)} />;
}

export default SideNavSpacing;

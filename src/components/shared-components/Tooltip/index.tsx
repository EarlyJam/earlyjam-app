import { PropsWithChildren, ReactNode } from "react";

import {
  Tooltip as ShadTooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

type TooltipProps = PropsWithChildren<{
  title?: ReactNode;
}>;

function Tooltip(props: TooltipProps) {
  const { children, title } = props;

  return (
    <ShadTooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </ShadTooltip>
  );
}

export default Tooltip;

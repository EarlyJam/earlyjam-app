import { PropsWithChildren } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

function Providers(props: PropsWithChildren) {
  const { children } = props;

  return <TooltipProvider>{children}</TooltipProvider>;
}

export default Providers;

import { PropsWithChildren } from "react";

import { cn } from "@/utils";

type Heading4Props = PropsWithChildren<{
  className?: string;
}>;

function Heading4(props: Heading4Props) {
  const { className, children } = props;

  return (
    <h4
      className={cn(
        "text-2xl font-semibold leading-7 text-functional-success-900",
        className
      )}
    >
      {children}
    </h4>
  );
}

export default Heading4;

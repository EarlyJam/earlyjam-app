import { PropsWithChildren } from "react";

import { cn } from "@/utils";

type Heading3Props = PropsWithChildren<{
  className?: string;
}>;

function Heading3(props: Heading3Props) {
  const { className, children } = props;

  return (
    <h3
      className={cn(
        "text-2.5xl font-semibold leading-8 text-blue-secondary-dark",
        className
      )}
    >
      {children}
    </h3>
  );
}

export default Heading3;

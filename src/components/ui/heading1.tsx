import { PropsWithChildren } from "react";

import { cn } from "@/utils";

type Heading1Props = PropsWithChildren<{
  className?: string;
}>;

function Heading1(props: Heading1Props) {
  const { className, children } = props;

  return (
    <h2
      className={cn(
        "font-fraunces text-5xl font-normal leading-14 text-blue-secondary-dark",
        className
      )}
    >
      {children}
    </h2>
  );
}

export default Heading1;

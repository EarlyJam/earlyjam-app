import { PropsWithChildren } from "react";

import { cn } from "@/utils";

type Heading5Props = PropsWithChildren<{
  className?: string;
}>;

function Heading5(props: Heading5Props) {
  const { className, children } = props;

  return (
    <h5
      className={cn(
        "text-xl font-semibold leading-6 text-blue-secondary-dark",
        className
      )}
    >
      {children}
    </h5>
  );
}

export default Heading5;

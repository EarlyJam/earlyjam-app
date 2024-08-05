import { cn } from "@/utils";
import { PropsWithChildren } from "react";

type H2Props = PropsWithChildren<{
  className?: string;
}>;

function Heading2(props: H2Props) {
  const { className, children } = props;

  return (
    <h2
      className={cn(
        "font-fraunces text-4xl font-normal leading-11 text-blue-secondary-dark",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export default Heading2;

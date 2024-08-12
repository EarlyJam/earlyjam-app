import { FC, ReactNode } from "react";

import { cn } from "@/utils";

type DividerProps = {
  className?: string;
  text?: ReactNode;
};

const Divider: FC<DividerProps> = (props) => {
  const { className, text } = props;
  return (
    <div className="relative flex w-full items-center">
      <div
        className={cn("flex-grow border-t border-gray-400-disable", className)}
      />
      {text && (
        <span className="mx-2.5 flex-shrink text-sm font-semibold text-blue-secondary-dark">
          {text}
        </span>
      )}
      <div
        className={cn("flex-grow border-t border-gray-400-disable", className)}
      />
    </div>
  );
};

export default Divider;

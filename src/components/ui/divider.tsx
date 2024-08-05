import { cn } from "@/utils";
import { FC, ReactNode } from "react";

type DividerProps = {
  className?: string;
  text?: ReactNode;
};

const Divider: FC<DividerProps> = (props) => {
  const { className, text } = props;
  return (
    <div className="relative flex items-center w-full">
      <div
        className={cn("flex-grow border-t border-gray-400-disable", className)}
      />
      {text && (
        <span className="flex-shrink mx-2.5 text-blue-secondary-dark text-sm font-semibold">
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

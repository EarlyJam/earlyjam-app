import { FC, ReactNode } from "react";

interface DividerProps {
  text?: ReactNode;
}

const Divider: FC<DividerProps> = (props) => {
  const { text } = props;
  return (
    <div className="relative flex items-center w-full">
      <div className="flex-grow border-t border-gray-400-disable"></div>
      {text && (
        <span className="flex-shrink mx-2.5 text-blue-secondary-dark text-sm font-semibold">
          {text}
        </span>
      )}
      <div className="flex-grow border-t border-gray-400-disable"></div>
    </div>
  );
};

export default Divider;

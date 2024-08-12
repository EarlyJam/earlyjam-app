import { MouseEvent, ReactNode, useState } from "react";

import { LuLoader2 } from "react-icons/lu";

import * as ShadButton from "@/components/ui/button";
import { cn } from "@/utils";

type ButtonProps = Omit<ShadButton.ButtonProps, "onClick"> & {
  loading?: boolean;
  showLoaderOnClick?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;

  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
};

function Button(props: ButtonProps) {
  const {
    children,
    disabled,
    variant,
    className,
    showLoaderOnClick,
    onClick,
    loading: propsLoading,
    startIcon,
    endIcon,
    ...rest
  } = props;

  const [loading, setLoading] = useState(false);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      const response = onClick(event);
      if (response instanceof Promise) {
        if (showLoaderOnClick) {
          setLoading(true);
        }

        await response.finally(() => {
          setLoading(false);
        });
      }

      setLoading(false);
    }
  };

  return (
    <ShadButton.Button
      className={cn(
        "flex w-full flex-row items-center rounded-full px-7 py-2.5 text-base font-semibold leading-5",
        {
          "bg-gray-300 text-gray-400-disable": disabled,
          "border-blue-secondary-dark": variant === "outline"
        },
        className
      )}
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      disabled={disabled || loading || propsLoading}
      variant={variant}
      onClick={handleClick}
      {...rest}
    >
      {(loading || propsLoading) && (
        <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {startIcon && <span className="mr-2">{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </ShadButton.Button>
  );
}

export default Button;

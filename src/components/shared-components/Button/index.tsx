import * as ShadButton from "@/components/ui/button";
import { cn } from "@/utils";
import { Loader2 } from "lucide-react";
import { MouseEvent, useState } from "react";

type ButtonProps = Omit<ShadButton.ButtonProps, "onClick"> & {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  loading?: boolean;
  showLoaderOnClick?: boolean;
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
        "rounded-full w-full py-2.5 px-7 text-base font-semibold leading-5",
        className,
        {
          "bg-gray-300 text-gray-400-disable": disabled,
          "border-blue-secondary-dark": variant === "outline",
        },
      )}
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      disabled={disabled || loading || propsLoading}
      variant={variant}
      onClick={handleClick}
      {...rest}
    >
      {(loading || propsLoading) && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </ShadButton.Button>
  );
}

export default Button;

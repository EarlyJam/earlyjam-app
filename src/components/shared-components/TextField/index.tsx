import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/utils";

type TextFieldProps = {
  prefixLabel?: string;
  containerClassName?: string;
} & InputProps;

function TextField(props: TextFieldProps) {
  const { prefixLabel, containerClassName, ...inputProps } = props;
  return (
    <div className={cn("flex flex-row", containerClassName)}>
      {prefixLabel && (
        <div className="flex h-10 items-center justify-center rounded-lg rounded-r-none border border-r-0 border-gray-400-disable px-3 py-2.5 text-gray-600-secondary">
          https://
        </div>
      )}
      <Input
        className={cn("flex-grow", { "rounded-l-none": !!prefixLabel })}
        {...inputProps}
      />
    </div>
  );
}

export default TextField;

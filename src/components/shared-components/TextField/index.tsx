import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/utils";

type TextFieldProps = {
  prefixLabel?: string;
} & InputProps;

function TextField(props: TextFieldProps) {
  const { prefixLabel, ...inputProps } = props;
  return (
    <div className="flex flex-row">
      {prefixLabel && (
        <div className="border border-r-0 border-gray-400-disable rounded-lg rounded-r-none flex items-center justify-center py-2.5 px-3 text-gray-600-secondary h-10">
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

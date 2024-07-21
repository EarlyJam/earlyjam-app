import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as ShadSelect,
} from "@/components/ui/select";
import { LabeledValue } from "@/types/global";
import { ReactNode } from "react";

type SelectProps = {
  options?: LabeledValue[];
  value: string;
  placeholder?: ReactNode;
  onChange(value: string): void;
};

function Select(props: SelectProps) {
  const { options = [], value, placeholder, onChange } = props;

  return (
    <ShadSelect onValueChange={onChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadSelect>
  );
}

export default Select;

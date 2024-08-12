import { ChangeEvent, useRef } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LabeledValue } from "@/types/global";
import { cn } from "@/utils";

type CheckboxGroupProps = {
  options?: LabeledValue[];
  allowCustomInput?: boolean;
  value?: string[];
  className?: string;
  containerClassName?: string;

  onChange?: (value: string[]) => void;
};

function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    options = [],
    value = [],
    onChange,
    allowCustomInput,
    className,
    containerClassName
  } = props;

  const customValueRef = useRef("");
  const customCheckRef = useRef(false);

  const updateValue = (array: string[], checked: boolean, option: string) => {
    const set = new Set(array);

    if (checked) {
      set.add(option);
    } else {
      set.delete(option);
    }

    return Array.from(set);
  };

  const handleChange = (checked: boolean, option: string) => {
    const newValue = updateValue(value, checked, option);
    onChange?.(newValue);
  };

  const handleCustomInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = customValueRef.current;

    customValueRef.current = e.target.value;

    if (customCheckRef.current) {
      const newValue = updateValue(
        updateValue(value, false, currentValue),
        true,
        e.target.value
      );
      onChange?.(newValue);
    }
  };

  const handleCustomCheckChange = (checked: boolean) => {
    customCheckRef.current = checked;
    handleChange(checked, customValueRef.current);
  };

  return (
    <div className={containerClassName}>
      <div className={cn("grid grid-cols-2 gap-4", className)}>
        {options.map((option) => (
          <div key={option.value} className="flex flex-row items-center gap-4">
            <Checkbox
              className="border-blue-secondary-dark data-[state=checked]:bg-transparent"
              value={option.value}
              id={option.value}
              checked={value.includes(option.value)}
              onCheckedChange={(checked) =>
                handleChange(checked as boolean, option.value)
              }
            />
            <Label className="text-gray-800" htmlFor={option.value}>
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      {allowCustomInput && (
        <div className="mt-1.5 flex flex-row items-center gap-4">
          <Checkbox
            className="border-blue-secondary-dark data-[state=checked]:bg-transparent"
            value="custom"
            id="custom"
            onCheckedChange={handleCustomCheckChange}
          />
          <Label className="text-gray-800" htmlFor="custom">
            <Input
              className="h-10.5 w-full max-w-50"
              placeholder="Others"
              onChange={handleCustomInputChange}
            />
          </Label>
        </div>
      )}
    </div>
  );
}

export default CheckboxGroup;

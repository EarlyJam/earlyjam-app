import { Badge } from "@/components/ui/badge";
import { LabeledValue } from "@/types/global";
import { cn } from "@/utils";
import { Check } from "lucide-react";

type ChipProps = {
  selected: boolean;
  label: string;
  onClick(): void;
};

function Chip(props: ChipProps) {
  const { selected, label, onClick } = props;

  return (
    <Badge
      variant="outline"
      className={cn("cursor-pointer leading-5 text-gray-700 px-4 py-1.5", {
        "text-primary border-primary font-semibold": selected,
      })}
      onClick={onClick}
    >
      {selected && <Check className="w-4 h-4 mr-2.5" />}
      {label}
    </Badge>
  );
}

type ChipSelectionProps = {
  options: LabeledValue[];
  value: string[];
  onChange: (value: string[]) => void;
};

function ChipSelection(props: ChipSelectionProps) {
  const { options, value = [], onChange } = props;

  const handleChipClick = (chip: string) => {
    const set = new Set(value);

    if (set.has(chip)) {
      set.delete(chip);
    } else {
      set.add(chip);
    }

    onChange(Array.from(set));
  };

  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {options.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={value.includes(option.value)}
          onClick={() => handleChipClick(option.value)}
        />
      ))}
    </div>
  );
}

export default ChipSelection;

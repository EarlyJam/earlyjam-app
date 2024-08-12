import { LabeledValue } from "@/types/global";

import Chip from "../Chip";

type ChipSelectionProps = {
  options?: LabeledValue[];
  value: string[];
  onChange: (value: string[]) => void;
};

function ChipSelection(props: ChipSelectionProps) {
  const { options = [], value = [], onChange } = props;

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
    <div className="flex flex-row flex-wrap gap-1.5">
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

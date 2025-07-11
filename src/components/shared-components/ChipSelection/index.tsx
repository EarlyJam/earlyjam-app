import { LabeledValue } from "@/types/global";

import Chip from "../Chip";

type ChipSelectionProps = {
  options?: LabeledValue[];
  value: string[] | string;
  onChange: (value: string[] | string) => void;
  singleSelect?: boolean;
};

function ChipSelection(props: ChipSelectionProps) {
  const { options = [], value = [], onChange, singleSelect } = props;

  const handleChipClick = (chip: string) => {
    if (singleSelect) {
      onChange(chip);
    } else {
      const set = new Set(value as string[]);
      if (set.has(chip)) {
        set.delete(chip);
      } else {
        set.add(chip);
      }
      onChange(Array.from(set));
    }
  };

  const selected = singleSelect ? [value as string] : (value as string[]);

  return (
    <div className="flex flex-row flex-wrap gap-1.5">
      {options.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={selected.includes(option.value)}
          onClick={() => handleChipClick(option.value)}
        />
      ))}
    </div>
  );
}

export default ChipSelection;

import { LuCheck } from "react-icons/lu";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils";

type ChipProps = {
  selected?: boolean;
  label: string;
  onClick?(): void;
};

function Chip(props: ChipProps) {
  const { selected, label, onClick } = props;

  return (
    <Badge
      variant="outline"
      className={cn("cursor-pointer px-4 py-1.5 leading-5 text-gray-700", {
        "border-primary font-semibold text-primary": selected
      })}
      onClick={onClick}
    >
      {selected && <LuCheck className="mr-2.5 h-4 w-4" />}
      {label}
    </Badge>
  );
}

export default Chip;

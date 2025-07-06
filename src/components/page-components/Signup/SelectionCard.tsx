import { FC } from "react";

import clsx from "clsx";
import { LuPenTool } from "react-icons/lu";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { UserType } from "@/enums/user";

const SELECTION_CARD_COPY = {
  client: "I want to receive feedback on my product",
  jammer: "I'm a designer looking for work",
  super_admin: ""
};

const ClientIcon = () => (
  <svg
    className="h-8 w-8 mb-4 mt-2"
    fill="none"
    viewBox="0 0 27 27"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M24 0H2.66667C1.2 0 0 1.2 0 2.66667V26.6667L5.33333 21.3333H24C25.4667 21.3333 26.6667 20.1333 26.6667 18.6667V2.66667C26.6667 1.2 25.4667 0 24 0ZM24 18.6667H4.22667L2.66667 20.2267V2.66667H24V18.6667Z"
        fill="#051D56"
      />
      <path
        d="M13.3333 17.3333L15.4267 12.76L20 10.6667L15.4267 8.57333L13.3333 4L11.24 8.57333L6.66667 10.6667L11.24 12.76L13.3333 17.3333Z"
        fill="#051D56"
      />
    </g>
  </svg>
);

const SELECTION_CARD_ICONS = {
  client: <ClientIcon />,
  jammer: <LuPenTool className="h-8 w-8 text-[#051D56] mb-4 mt-2" />,
  super_admin: null
};

type SelectionCardProps = {
  value: UserType;
  selected: boolean;
};

const SelectionCard: FC<SelectionCardProps> = (props) => {
  const { value, selected } = props;

  return (
    <Card
      className={clsx(
        "w-full rounded-2xl shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)] bg-white hover:border-blue-secondary-dark sm:max-w-[328px] transition-all border border-transparent relative flex flex-col items-start justify-start",
        {
          "border-blue-secondary-dark": selected
        }
      )}
    >
      <Label htmlFor={value} className="block cursor-pointer w-full h-full">
        <CardContent className="flex flex-col items-start justify-start pt-6 pb-6 px-6 w-full h-full relative">
          {/* Radio button top right */}
          <div className="absolute top-4 right-4 z-10">
            <RadioGroupItem
              value={value}
              id={value}
              className="border-[#667085] text-blue-secondary-dark accent-blue-secondary-dark outline-none rounded-[10px] size-5"
            />
          </div>
          {/* Icon above text, both left-aligned */}
          {SELECTION_CARD_ICONS[value]}
          {/* Text */}
          <h4 className="text-left font-gilroy font-medium text-[24px] leading-[28px] text-[#051D56] w-full">
            {SELECTION_CARD_COPY[value]}
          </h4>
        </CardContent>
      </Label>
    </Card>
  );
};

export default SelectionCard;

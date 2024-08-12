import { FC } from "react";

import clsx from "clsx";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { UserType } from "@/enums/user";

const SELECTION_CARD_COPY = {
  client: "I want to receive feedback on my product",
  jammer: "I’m a designer looking for work"
};

const SELECTION_CARD_IMAGES = {
  client: "/assets/images/onboarding_selection_client.png",
  jammer: "/assets/images/onboarding_selection_jammer.png"
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
        "w-full rounded-2xl hover:border-blue-secondary-dark sm:max-w-[328px]",
        {
          "border border-blue-secondary-dark": selected
        }
      )}
    >
      <Label htmlFor={value}>
        <CardContent className="space-y-6 px-2 pb-6 pt-2">
          <div className="flex flex-row-reverse">
            <RadioGroupItem
              value={value}
              id={value}
              className="border-gray-600-secondary text-blue-secondary-dark accent-blue-secondary-dark outline-none"
            />
          </div>
          <img
            className="m-auto h-16 sm:h-30"
            src={SELECTION_CARD_IMAGES[value]}
            alt={value}
            loading="lazy"
          />
          <h4 className="text-center text-2xl font-semibold leading-7 text-blue-secondary-dark">
            {SELECTION_CARD_COPY[value]}
          </h4>
        </CardContent>
      </Label>
    </Card>
  );
};

export default SelectionCard;

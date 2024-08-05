import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { UserType } from "@/enums/user";
import clsx from "clsx";
import { FC } from "react";

const SELECTION_CARD_COPY = {
  client: "I want to receive feedback on my product",
  jammer: "I’m a designer looking for work",
};

const SELECTION_CARD_IMAGES = {
  client: "/assets/images/onboarding_selection_client.png",
  jammer: "/assets/images/onboarding_selection_jammer.png",
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
        "w-full sm:max-w-[328px] rounded-2xl hover:border-blue-secondary-dark",
        {
          "border border-blue-secondary-dark": selected,
        },
      )}
    >
      <Label htmlFor={value}>
        <CardContent className="px-2 pt-2 pb-6 space-y-6">
          <div className="flex flex-row-reverse">
            <RadioGroupItem
              value={value}
              id={value}
              className="border-gray-600-secondary outline-none accent-blue-secondary-dark text-blue-secondary-dark"
            />
          </div>
          <img
            className="sm:h-30 h-16 m-auto"
            src={SELECTION_CARD_IMAGES[value]}
            alt={value}
            loading="lazy"
          />
          <h4 className="text-2xl text-blue-secondary-dark font-semibold leading-7 text-center">
            {SELECTION_CARD_COPY[value]}
          </h4>
        </CardContent>
      </Label>
    </Card>
  );
};

export default SelectionCard;

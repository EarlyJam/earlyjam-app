import { Dispatch, SetStateAction } from "react";

import SelectionCard from "@/components/page-components/Signup/SelectionCard";
import { RadioGroup } from "@/components/ui/radio-group";
import { UserType } from "@/enums/user";

type OnboardingSelectionProps = {
  selectedType: UserType.Client | UserType.Jammer | null;
  setSelectedType: Dispatch<SetStateAction<UserType.Client | UserType.Jammer | null>>;
};

const ONBOARDING_TYPES = [UserType.Client, UserType.Jammer] as const;

const OnboardingSelection = ({ selectedType, setSelectedType }: OnboardingSelectionProps) => {
  return (
    <div className="mx-5 flex flex-col items-center justify-center gap-10">
      <div>
        <RadioGroup
          className="flex flex-col gap-8 sm:flex-row"
          value={selectedType ?? undefined}
          onValueChange={(value) =>
            setSelectedType(value as UserType.Client | UserType.Jammer)
          }
        >
          {ONBOARDING_TYPES.map((type) => (
            <SelectionCard
              key={type}
              value={type}
              selected={selectedType === type}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default OnboardingSelection;

import { useState } from "react";

import { Link } from "@tanstack/react-router";

import SelectionCard from "@/components/page-components/Signup/SelectionCard";
import SignupButton from "@/components/page-components/Signup/SignupButton";
import { RadioGroup } from "@/components/ui/radio-group";
import { UserType } from "@/enums/user";

const ONBOARDING_TYPES = [UserType.Client, UserType.Jammer] as const;

const OnboardingSelection = () => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  return (
    <div className="mx-5 mt-14 flex flex-col items-center justify-center gap-10 sm:mt-24">
      <h2 className="text-center font-fraunces text-4xl font-normal leading-11 text-blue-secondary-dark">
        Join as a client or designer
      </h2>
      <div>
        <RadioGroup
          className="flex flex-col gap-8 sm:flex-row"
          onValueChange={(value) =>
            setSelectedType(value as typeof selectedType)
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
      <SignupButton selectedType={selectedType} />
      <p className="text-sm font-normal text-gray-700">
        Already have an EarlyJam account?&nbsp;
        <Link
          to="/login"
          className="text-sm font-semibold text-blue-primary-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default OnboardingSelection;

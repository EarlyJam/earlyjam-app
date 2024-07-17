import SelectionCard from "@/components/page-components/Signup/SelectionCard";
import SignupButton from "@/components/page-components/Signup/SignupButton";
import { RadioGroup } from "@/components/ui/radio-group";
import { UserType } from "@/enums/user";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

const ONBOARDING_TYPES = [UserType.Client, UserType.Jammer] as const;

const OnboardingSelection = () => {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  return (
    <div className="flex flex-col justify-center items-center mt-14 mx-5 sm:mt-24 gap-10">
      <h2 className="text-4xl leading-11 text-center font-normal text-blue-secondary-dark font-fraunces">
        Join as a client or designer
      </h2>
      <div>
        <RadioGroup
          className="flex flex-col sm:flex-row gap-8"
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
      <p className="text-gray-700 text-sm font-normal">
        Already have an EarlyJam account?&nbsp;
        <Link
          to="/login"
          className="font-semibold text-blue-primary-500 text-sm"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default OnboardingSelection;

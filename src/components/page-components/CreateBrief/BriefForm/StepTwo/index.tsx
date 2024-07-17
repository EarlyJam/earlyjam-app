import Button from "@/components/shared-components/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Control } from "react-hook-form";
import { FormType } from "../index";
import FormFields from "./FormFields";

type StepTwoProps = {
  isSubmitting: boolean;
  control: Control<FormType>;
  onSubmit(): void;
  onBack(): void;
};

function StepTwo(props: StepTwoProps) {
  const { isSubmitting, control, onSubmit, onBack } = props;

  return (
    <Card className="max-w-[696px] w-full space-y-8 shadow-none rounded-2xl border-none p-4">
      <CardHeader className="pb-0">
        <div className="flex flex-row items-center justify-between mb-8">
          <p className="font-semibold text-gray-700">2/3</p>
          <p className="text-gray-500 font-normal">
            <span className="font-semibold mr-3">Next</span>
            Select your Jammers
          </p>
        </div>
        <CardTitle className="text-2.5xl leading-8">
          Focus your design design critique
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-0">
        <FormFields control={control} />
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <Button className="max-w-60 w-full" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onSubmit}
          loading={isSubmitting}
          className="max-w-60 w-full"
        >
          Next step
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepTwo;

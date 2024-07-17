import Button from "@/components/shared-components/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FormType } from "@/components/page-components/CreateBrief/BriefForm";
import { Control } from "react-hook-form";
import FormFields from "./FormFields";

type StepOneProps = {
  control: Control<FormType>;
  onSubmitDone(): void;
};

function StepOne(props: StepOneProps) {
  const { control, onSubmitDone } = props;

  return (
    <Card className="max-w-[696px] w-full space-y-8 shadow-none rounded-2xl border-none p-4">
      <CardHeader className="pb-0">
        <div className="flex flex-row items-center justify-between mb-8">
          <p className="font-semibold text-gray-700">1/3</p>
          <p className="text-gray-500 font-normal">
            <span className="font-semibold mr-3">Next</span>
            Your design critique brief
          </p>
        </div>
        <CardTitle className="text-2.5xl leading-8">
          Tell us about your product
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-0">
        <FormFields control={control} />
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <Button
          type="button"
          className="max-w-60 w-full"
          onClick={onSubmitDone}
        >
          Next step
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepOne;

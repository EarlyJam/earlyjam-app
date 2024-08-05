import { useMemo, useState } from "react";

import Button from "@/components/shared-components/Button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "@/components/util-components/Form";
import { createProject } from "@/helpers/db/project";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { useToast } from "@/hooks/useToast";
import TipsBox from "./TipsBox";
import { formFields, formSchema, FormType } from "./briefFormFields";

const COPY_TEXT = {
  1: {
    title: "Tell us about your product",
    nextText: "Your design critique brief",
  },
  2: {
    title: "Focus your design design critique",
    nextText: "Select your Jammers",
  },
};

type BriefFormProps = {
  onSubmitDone(): void;
};

function BriefForm(props: BriefFormProps) {
  const { onSubmitDone } = props;

  const { data: user } = useAuthUser();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const copyTextKey = currentStep as keyof typeof COPY_TEXT;
  const nextText = COPY_TEXT[copyTextKey].nextText;
  const title = COPY_TEXT[copyTextKey].title;

  const fields = useMemo(() => {
    return formFields[currentStep];
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep === 2) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (data: FormType) => {
    if (!user?.id) {
      return;
    }
    setLoading(true);

    await createProject({
      ...data,
      project_link: data.project_link.filter((link) => link.url),
      user_id: user.id,
      status: "awaiting_response",
    })
      .then(() => onSubmitDone())
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full py-10 px-5 flex flex-col sm:flex-row justify-center items-start gap-8">
      <Card className="max-w-card w-full space-y-8 shadow-none rounded-2xl border-none p-4">
        <CardHeader className="p-1 sm:p-6 pb-0">
          <div className="flex flex-row items-center justify-between mb-8">
            <p className="font-semibold text-sm sm:text-base text-gray-700">
              {currentStep}/3
            </p>
            <p className="text-gray-500 text-sm sm:text-base font-normal">
              <span className="font-semibold mr-3">Next</span>
              {nextText}
            </p>
          </div>
          <CardTitle className="text-2xl leading-7 sm:text-2.5xl sm:leading-8">
            {title}
          </CardTitle>
        </CardHeader>
        <Form
          schema={formSchema}
          onSubmit={handleSubmit}
          onError={() => {
            toast({
              title: "Error",
              description: "Please fix the errors in the form.",
              variant: "destructive",
            });
          }}
          fieldsContainerClassName="px-1 sm:px-6"
          childrenContainerClassName="pt-8 border-t border-dashed border-gray-400-disable mx-1 sm:mx-6"
          fields={fields}
          defaultValues={{
            product_name: "",
            product_description: "",
            product_problem_statement: "",
            product_type: "",
            product_industry: [],
            feedback_feature: "",
            designer_critique_aspects: "",
            feedback_aspects: [],
            feedback_goals: [],
            project_link: [{ url: "" }],
            project_images: [],
          }}
          mode="onSubmit"
        >
          <CardFooter className="flex flex-col sm:flex-row-reverse sm:justify-between px-0 gap-4">
            {currentStep === 2 ? (
              <Button
                loading={loading}
                className="max-w-60 w-full"
                type="submit"
                key="brief-form-submit-button"
              >
                Next step
              </Button>
            ) : (
              <Button className="sm:max-w-60 w-full" onClick={handleNextStep}>
                Next step
              </Button>
            )}
            {currentStep > 1 && (
              <Button
                className="sm:max-w-60 w-full"
                variant="outline"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
          </CardFooter>
        </Form>
      </Card>
      <TipsBox />
    </div>
  );
}

export default BriefForm;

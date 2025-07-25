import { ReactNode, useMemo } from "react";

import { useNavigate } from "@tanstack/react-router";

import {
  formFields,
  formSchema,
  FormType
} from "@/components/page-components/JammerOboarding/jammerInfoFormFields";
import Button from "@/components/shared-components/Button";
import Form from "@/components/shared-components/Form";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import useUpdateProfile from "@/hooks/mutations/useUpdateProfile";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { useToast } from "@/hooks/useToast";

const COPY_TEXT: Record<
  number,
  { title?: string; nextText?: string; description?: ReactNode } | undefined
> = {
  1: {
    title: "Complete Jammer profile",
    nextText: "Share your experience with us"
  },
  2: {
    title: "Complete Jammer profile",
    description: "*This section wont be display on your public profile"
  }
};

type JammerInfoFormProps = {
  currentStep: number;

  setCurrentStep(step: number): void;
  onSubmitDone(): void;
};

function JammerInfoForm(props: JammerInfoFormProps) {
  const { currentStep, setCurrentStep, onSubmitDone } = props;

  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: profile } = useAuthProfile();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile();

  const nextText = COPY_TEXT[currentStep]?.nextText;
  const title = COPY_TEXT[currentStep]?.title;
  const description = COPY_TEXT[currentStep]?.description;

  const fields = useMemo(() => {
    return formFields[currentStep];
  }, [currentStep]);

  const formResetDependencies = useMemo(() => [profile], [profile]);

  const handleNextStep = () => {
    if (currentStep === 2) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleCancel = async () => {
    await navigate({ to: "/dashboard" });
  };

  const handleSubmit = async (data: FormType) => {
    if (profile) {
      try {
        await updateProfile({
          id: profile.id,
          data: {
            ...data,
            portfolio_links: data.portfolio_links.filter((link) => link.url),
            onboarding_done: true
          }
        });

        onSubmitDone();
      } catch (e) {
        toast({
          title: "Error",
          description: (e as Error).message,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-card space-y-8 rounded-2xl border-none p-4 shadow-none">
      <CardHeader className="p-1 pb-0 sm:p-6">
        <div className="mb-8 flex flex-row items-center justify-between">
          <p className="text-sm font-semibold text-gray-700 sm:text-base">
            {currentStep}/2
          </p>
          {nextText && (
            <p className="text-sm font-normal text-gray-500 sm:text-base">
              <span className="mr-3 font-semibold">Next</span>
              {nextText}
            </p>
          )}
        </div>
        <CardTitle className="text-2xl leading-7 sm:text-2.5xl sm:leading-8">
          {title}
        </CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <CardDescription className="px-1 text-sm text-gray-600-secondary sm:px-6">
          {description}
        </CardDescription>
        <Form
          schema={formSchema}
          onSubmit={handleSubmit}
          onError={() => {
            toast({
              title: "Error",
              description: "Please fix the errors in the form.",
              variant: "destructive"
            });
          }}
          fieldsContainerClassName="px-1 sm:px-6 grid grid-cols-2 space-y-0 gap-y-6 gap-x-2.5"
          childrenContainerClassName="pt-8 border-t border-dashed border-gray-400-disable mx-1 sm:mx-6"
          fields={fields}
          defaultValues={{
            first_name: profile?.first_name ?? "",
            last_name: profile?.last_name ?? "",
            profile_image: profile?.profile_image ?? "",
            work_experience: profile?.work_experience ?? "",
            expertise: profile?.expertise ?? [],
            linkedin_url: profile?.linkedin_url ?? "",
            portfolio_links: profile?.portfolio_links ?? [{ url: "" }],
            project_images: profile?.project_images ?? []
          }}
          mode="onSubmit"
          formResetDependencies={formResetDependencies}
        >
          <CardFooter className="flex flex-col gap-4 px-0 sm:flex-row-reverse sm:justify-between">
            {currentStep === 2 ? (
              <Button
                loading={isUpdating}
                className="flex-grow"
                type="submit"
                key="jammer-onboarding-form-submit-button"
              >
                Submit
              </Button>
            ) : (
              <Button
                className="flex-grow sm:max-w-60"
                onClick={handleNextStep}
              >
                Next
              </Button>
            )}
            <Button
              className="flex-grow sm:max-w-60"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </CardFooter>
        </Form>
      </div>
    </Card>
  );
}

export default JammerInfoForm;

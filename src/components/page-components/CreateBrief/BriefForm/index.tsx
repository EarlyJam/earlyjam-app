import { useState } from "react";

import { createProject } from "@/helpers/db/project";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import TipsBox from "./TipsBox";

const formSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  product_description: z.string().min(1, "Product description is required"),
  product_problem_statement: z.string().min(1, "Problem statement is required"),
  product_type: z.string().min(1, "Product type is required"),
  product_industry: z
    .array(z.string())
    .nonempty("Product industry is required"),
  feedback_feature: z.string().min(1, "Feedback feature is required"),
  designer_critique_aspects: z
    .string()
    .min(1, "Designer critique aspects is required"),
  feedback_aspects: z
    .array(z.string())
    .nonempty("Feedback aspects is required"),
  feedback_goals: z.array(z.string()).nonempty("Feedback goals is required"),
  project_link: z.array(z.string()),
  project_images: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    }),
  ),
});

export type FormType = z.infer<typeof formSchema>;

type BriefFormProps = {
  onSubmitDone(): void;
};

function BriefForm(props: BriefFormProps) {
  const { onSubmitDone } = props;

  const { data: user } = useAuthUser();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      product_description: "",
      product_problem_statement: "",
      product_type: "",
      product_industry: [],
      feedback_feature: "",
      designer_critique_aspects: "",
      feedback_aspects: [],
      feedback_goals: [],
      project_link: [" "],
      project_images: [],
    },
  });

  const handleNextStep = () => {
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
      user_id: user.id,
      status: "pending",
      project_link: data.project_link
        .map((link) => link.trim())
        .filter(Boolean),
    })
      .then(() => onSubmitDone())
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full my-10 flex flex-row justify-center items-start gap-8">
      <FormProvider {...form}>
        {currentStep === 1 && (
          <StepOne control={form.control} onSubmitDone={handleNextStep} />
        )}
        {currentStep === 2 && (
          <StepTwo
            control={form.control}
            isSubmitting={loading}
            onSubmit={form.handleSubmit(handleSubmit, () => {
              toast({
                title: "Error",
                description: "Please fix the errors in the form.",
                variant: "destructive",
              });
            })}
            onBack={handleBack}
          />
        )}
      </FormProvider>
      <TipsBox />
    </div>
  );
}

export default BriefForm;

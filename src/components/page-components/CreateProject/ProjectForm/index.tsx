import { useMemo, useState, useEffect } from "react";

import { useNavigate } from "@tanstack/react-router";
import { Route } from "@/routes/_auth/_simple-layout/project/create";

import Button from "@/components/shared-components/Button";
import Form from "@/components/shared-components/Form";
import FormField from "@/components/shared-components/Form/FormField";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createProject, updateProject } from "@/helpers/db/project";
import { deleteProjectDraft } from "@/helpers/db/projectDraft";
import useCreateProjectDraft from "@/hooks/mutations/useCreateProjectDraft";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { useToast } from "@/hooks/useToast";
import { Project } from "@/types/project";
import { ProjectDraft } from "@/types/projectDraft";

import { formFields, formSchema, FormType, step1Schema, step2Schema } from "./projectFormFields";
import TipsBox from "./TipsBox";
import React from "react";

const COPY_TEXT = {
  1: {
    title: "Tell us about your product",
    nextText: "Your design critique brief"
  },
  2: {
    title: "Focus your design design critique",
    nextText: "Select your Jammers"
  }
};

type ProjectFormProps = {
  project?: Partial<Project>;
  mode?: "create" | "edit" | "draft";
  draftId?: string;
  onSubmitDone(projectId: string): void;
};

function ProjectForm(props: ProjectFormProps) {
  const {
    project = {
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
      project_images: []
    },
    mode = "create",
    draftId,
    onSubmitDone
  } = props;

  const navigate = useNavigate();
  const { data: user } = useAuthUser();
  const { toast } = useToast();

  // Read step from URL query param
  const search = Route.useSearch();
  const [currentStep, setCurrentStep] = useState(
    Number(search.step) >= 1 && Number(search.step) <= 4 ? Number(search.step) : 1
  );

  const [loading, setLoading] = useState(false);

  // Accumulate form data across steps
  // TODO: For full type safety, use discriminated unions or step-specific types
  const proj = project as any;
  const [formData, setFormData] = useState<any>({
    product_name: proj.product_name || "",
    product_overview: proj.product_overview || "",
    key_features: proj.key_features || [],
    product_type: proj.product_type || "",
    industry: proj.industry || [],
    // Step 2 fields
    project_files: proj.project_files || [],
    project_link: proj.project_link || [{ url: "" }],
    critique_focus: proj.critique_focus || "",
    feedback_aspects: proj.feedback_aspects || [],
    feature_flows: proj.feature_flows || [],
    feedback_goals: proj.feedback_goals || [],
  });

  const { mutateAsync: createProjectDraft, isPending } =
    useCreateProjectDraft();

  const copyTextKey = currentStep as keyof typeof COPY_TEXT;
  const nextText = COPY_TEXT[copyTextKey].nextText;
  const title = COPY_TEXT[copyTextKey].title;

  const allFields = Object.values(formFields).flat();

  const fields = useMemo(() => {
    return formFields[currentStep];
  }, [currentStep]);

  // Update URL when currentStep changes
  useEffect(() => {
    if (search.step !== String(currentStep)) {
      navigate({ search: { ...search, step: String(currentStep) }, replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step 1 submit handler: validate step 1, accumulate data, go to step 2
  const handleStep1Submit = (data: Partial<FormType>) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  // Step 2 submit handler: validate step 2, merge and submit all data
  const handleStep2Submit = (data: Partial<FormType>) => {
    const merged = { ...formData, ...data };
    handleSubmit(merged);
  };

  const handleSubmit = async (data: FormType) => {
    if (!user?.id) {
      return;
    }
    setLoading(true);

    const projectId = project.id;

    if (!projectId) {
      await createProject({
        ...data,
        user_id: user.id,
        status: "awaiting_response"
      })
        .then(async (project) => {
          if (mode === "draft" && draftId) {
            await deleteProjectDraft(draftId);
          }
          project && onSubmitDone(project.id);
        })
        .finally(() => setLoading(false));
    } else {
      await updateProject(projectId, {
        ...data
      })
        .then(() => onSubmitDone(projectId))
        .finally(() => setLoading(false));
    }
  };

  const handleSaveAsDraft = async (draft: Partial<ProjectDraft>) => {
    if (!user?.id) {
      return;
    }

    await createProjectDraft({
      ...draft,
      user_id: user.id
    });

    void navigate({ to: "/dashboard", search: { t: "drafts" } });
  };

  // Stepper steps config
  const steps = [
    { label: "Project Info" },
    { label: "Design Scope" },
    { label: "Feedback Needs" },
    { label: "User Context" }
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] bg-[#F7F5F0]" style={{ paddingTop: 16, paddingBottom: 16 }}>
      {/* Back to Dashboard button above both card and TipsBox */}
      <div className="w-full max-w-[1100px] px-4 mb-2 flex">
        <div className="max-w-[700px] px-8 w-full">
          <button
            type="button"
            className="flex items-center gap-1.5 text-[#0A2259] font-[600] text-lg py-4 font-['Gilroy-SemiBold'] hover:underline focus:underline underline-offset-2"
            onClick={() => navigate({ to: "/dashboard" })}
            style={{ letterSpacing: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1">
              <path d="M5.28781 11.6796L5.28772 5.28809M5.28772 5.28809L11.5883 5.28809M5.28772 5.28809L12.7123 12.7127" stroke="#0A2259" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>
      {/* Flex row: card and TipsBox */}
      <div className="w-full flex flex-col md:flex-row justify-center items-start gap-8 max-w-[1100px] px-4">
        <div className="w-full max-w-[700px] px-8">
          <div className="bg-white rounded-2xl border border-[#eaecf0] p-0 w-full relative">
            {/* Stepper */}
            <div className="flex flex-row items-center justify-between px-8 pt-10 pb-6 w-full">
              {steps.map((step, idx) => {
                const isCompleted = currentStep > idx + 1;
                const isCurrent = currentStep === idx + 1;
                return (
                  <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center">
                      <div
                        className={
                          isCompleted
                            ? "flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#518d5f] bg-[#518d5f]"
                            : isCurrent
                            ? "flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#518d5f] bg-white"
                            : "flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#d0d5dd] bg-white"
                        }
                      >
                        {isCompleted ? (
                          // Green checkmark SVG (32x32, scaled to 32px)
                          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="16" fill="#518D5F"/>
                            <path d="M13.8634 18.5836L11.0834 15.8036L10.1367 16.7436L13.8634 20.4703L21.8634 12.4703L20.9234 11.5303L13.8634 18.5836Z" fill="white"/>
                          </svg>
                        ) : isCurrent ? (
                          // Pencil icon SVG (Figma style)
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33325 16.6667H16.6666" stroke="#518D5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.4166 6.08333L13.9166 9.58333M5.83325 14.1667L7.08325 13.9583C7.41659 13.9 7.58325 13.875 7.73659 13.8083C7.87159 13.75 7.99592 13.6667 8.09992 13.5583C8.21659 13.4333 8.29159 13.2667 8.44159 12.9333L14.3499 7.025C14.8416 6.53333 14.8416 5.725 14.3499 5.23333L13.2666 4.15C12.7749 3.65833 11.9666 3.65833 11.4749 4.15L5.56659 10.0583C5.23325 10.3917 5.06659 10.5583 4.95825 10.7417C4.85825 10.9083 4.79159 11.1 4.76659 11.3C4.74159 11.5 4.78325 11.7167 4.86659 12.15L5.08325 13.2083C5.13325 13.45 5.15825 13.5708 5.22592 13.6625C5.28592 13.7417 5.36659 13.8 5.45825 13.825C5.56659 13.8583 5.69159 13.825 5.94159 13.7583L7.08325 13.4583" stroke="#518D5F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <span className="text-[#667085] font-semibold text-base">{idx + 1}</span>
                        )}
                      </div>
                      <span
                        className={
                          isCompleted || isCurrent
                            ? "mt-2 text-xs font-semibold text-[#3d6947]"
                            : "mt-2 text-xs text-[#475467]"
                        }
                      >
                        {step.label}
                      </span>
                    </div>
                    {/* Line between steps, except after last step */}
                    {idx < steps.length - 1 && (
                      <div
                        className={
                          isCompleted
                            ? "bg-[#518d5f] h-px w-[60px] mx-2"
                            : "bg-[#d0d5dd] h-px w-[60px] mx-2"
                        }
                        style={{ marginTop: "-20px" }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {/* Heading & Subheading */}
            <div className="flex flex-col gap-1 px-8 pb-6">
              <h1 className="text-[28px] font-semibold text-[#051d56] leading-8">What are you working on?</h1>
              <p className="text-[18px] text-[#475467] leading-6">Give us a quick snapshot.</p>
            </div>
            {/* Form Fields */}
            <div className="px-8 pb-8">
              <Form
                schema={currentStep === 1 ? step1Schema : step2Schema}
                defaultValues={formData}
                fields={fields as any} // TODO: For full type safety, use step-specific field types
                onSubmit={currentStep === 1 ? handleStep1Submit : handleStep2Submit}
                formClassName="space-y-6"
              >
                {() => (
                  <div className="flex flex-row items-center justify-between gap-4 pt-8 border-t border-dashed border-[#D0D5DD] mt-8">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-7 py-2.5 rounded-[22px] border border-[#051d56] text-[#051d56] font-semibold text-base bg-white hover:bg-[#f3f4f6] transition-colors"
                      onClick={() => handleSaveAsDraft(formData)}
                      disabled={loading}
                    >
                      Save as draft
                    </button>
                    <div className="flex flex-row gap-4">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-7 py-2.5 rounded-[22px] border border-[#051d56] text-[#051d56] font-semibold text-base bg-white hover:bg-[#f3f4f6] transition-colors"
                        onClick={() => navigate({ to: "/dashboard" })}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-7 py-2.5 rounded-[22px] bg-[#7ad38e] text-[#051d56] font-semibold text-base hover:bg-[#67b97a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? (currentStep === 1 ? "Next..." : "Creating...") : "Next"}
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        {/* TipsBox rendered outside the card, as a sidebar, top-aligned with card */}
        <div className="w-full md:w-[320px] flex-shrink-0 md:mt-0 mt-8 md:self-start md:sticky md:top-8">
          <TipsBox />
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;

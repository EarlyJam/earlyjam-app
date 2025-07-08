import { useMemo, useState } from "react";

import { useNavigate } from "@tanstack/react-router";

import Button from "@/components/shared-components/Button";
import Form from "@/components/shared-components/Form";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createProject, updateProject } from "@/helpers/db/project";
import { deleteProjectDraft } from "@/helpers/db/projectDraft";
import useCreateProjectDraft from "@/hooks/mutations/useCreateProjectDraft";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { useToast } from "@/hooks/useToast";
import { Project } from "@/types/project";
import { ProjectDraft } from "@/types/projectDraft";

import { formFields, formSchema, FormType } from "./projectFormFields";
import TipsBox from "./TipsBox";

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

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: createProjectDraft, isPending } =
    useCreateProjectDraft();

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

    const projectId = project.id;

    if (!projectId) {
      await createProject({
        ...data,
        project_link: data.project_link.filter((link) => link.url),
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
        ...data,
        project_link: data.project_link.filter((link) => link.url)
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
      project_link: draft.project_link?.filter((link) => link.url) ?? [],
      user_id: user.id
    });

    void navigate({ to: "/dashboard", search: { t: "drafts" } });
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-8 px-5 py-10 sm:flex-row">
      <Card className="w-full max-w-card space-y-8 rounded-2xl border-none p-4 shadow-none">
        <CardHeader className="p-1 pb-0 sm:p-6">
          <div className="mb-8 flex flex-row items-center justify-between">
            <p className="text-sm font-semibold text-gray-700 sm:text-base">
              {currentStep}/3
            </p>
            <p className="text-sm font-normal text-gray-500 sm:text-base">
              <span className="mr-3 font-semibold">Next</span>
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
              variant: "destructive"
            });
          }}
          fieldsContainerClassName="px-1 sm:px-6"
          childrenContainerClassName="pt-8 border-t border-dashed border-gray-400-disable mx-1 sm:mx-6"
          fields={fields}
          defaultValues={project}
          mode="onSubmit"
        >
          {(form) => (
            <CardFooter className="flex flex-col gap-4 px-0 sm:flex-row-reverse sm:items-start sm:justify-between">
              <div className="flex flex-col justify-center">
                {currentStep === 2 ? (
                  <Button
                    loading={loading}
                    className="w-full max-w-60"
                    type="submit"
                    key="brief-form-submit-button"
                  >
                    Next step
                  </Button>
                ) : (
                  <Button
                    className="w-full sm:max-w-60"
                    onClick={handleNextStep}
                  >
                    Next step
                  </Button>
                )}
                {mode === "create" && (
                  <Button
                    loading={isPending}
                    variant="link"
                    className="text-blue-secondary-dark underline"
                    onClick={() => handleSaveAsDraft(form.getValues())}
                  >
                    Save as a draft
                  </Button>
                )}
              </div>
              {currentStep > 1 && (
                <Button
                  className="w-full sm:max-w-60"
                  variant="outline"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
            </CardFooter>
          )}
        </Form>
      </Card>
      <TipsBox />
    </div>
  );
}

export default ProjectForm;

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LuCamera } from "react-icons/lu";
import { z } from "zod";

import BackLink from "@/components/shared-components/BackLink";
import Button from "@/components/shared-components/Button";
import Form from "@/components/shared-components/Form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFieldType } from "@/enums/form";
import useCreateProjectResponse from "@/hooks/mutations/useCreateProjectResponse";
import useUpdateProjectJammerStatus from "@/hooks/mutations/useUpdateProjectJammerStatus";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { FormField } from "@/types/form";

const formSchema = z.object({
  loom_video_id: z.string().optional(),
  summary: z.string().min(1, { message: "Summary is required" }),
  additional_link: z.string().optional()
});

type FormSchemaType = z.infer<typeof formSchema>;

const formFields: FormField<FormSchemaType>[] = [
  {
    name: "loom_video_id",
    type: FormFieldType.RecordVideoButton,
    label: "Video Respond",
    icon: <LuCamera />,
    fieldData: { children: "Record a video" }
  },
  {
    name: "summary",
    type: FormFieldType.TextArea,
    label: "Summary",
    fieldData: { showCharacterCount: true, maxLength: 164 },
    description: "Enter design feedback summary",
    descriptionPosition: "bottom"
  },
  {
    name: "additional_link",
    type: FormFieldType.TextField,
    label: "Additional Link"
  }
];

export const Route = createFileRoute("/_auth/_app-layout/project/$id/respond")({
  component: ProjectRespond
});

function ProjectRespond() {
  const { id } = Route.useParams();

  const navigate = useNavigate();

  const { data: user } = useAuthUser();

  const { mutateAsync: createProjectResponse, isPending } =
    useCreateProjectResponse();
  const {
    mutateAsync: updateProjectJammerStatus,
    isPending: isJammerStatusPending
  } = useUpdateProjectJammerStatus("closed");

  const handleFormSubmit = async (data: FormSchemaType) => {
    if (!user?.id) {
      return;
    }

    await createProjectResponse({
      projectId: id,
      jammerId: user.id,
      data: {
        summary: data.summary,
        additional_links: data.additional_link ? [data.additional_link] : [],
        loom_video_id: data.loom_video_id
      }
    });

    await updateProjectJammerStatus({
      projectId: id,
      userId: user.id
    });

    await navigate({
      to: "/project/$id",
      params: { id }
    });
  };

  return (
    <div className="space-y-6 px-5 py-10 sm:space-y-8 sm:px-8 sm:py-5">
      <BackLink to="/project/$id" params={{ id }} />
      <Card className="max-w-card rounded-2xl shadow-none">
        <CardHeader className="mx-4 mb-4 mt-6 border-b px-0 pb-4 pt-0">
          <CardTitle className="text-xl leading-6">Respond session</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-6">
          <Form
            schema={formSchema}
            fields={formFields}
            onSubmit={handleFormSubmit}
          >
            {({ formState }) => (
              <Button
                className="w-auto"
                disabled={
                  !formState.isValid || isPending || isJammerStatusPending
                }
                type="submit"
                loading={isPending || isJammerStatusPending}
              >
                Send Respond
              </Button>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

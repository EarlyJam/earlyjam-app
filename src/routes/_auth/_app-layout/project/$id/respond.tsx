import BackLink from "@/components/shared-components/BackLink";
import Button from "@/components/shared-components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "@/components/util-components/Form";
import { FormFieldType } from "@/enums/form";
import useCreateProjectResponse from "@/hooks/mutations/useCreateProjectResponse";
import useUpdateProjectJammerStatus from "@/hooks/mutations/useUpdateProjectJammerStatus";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { FormField } from "@/types/form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LuCamera } from "react-icons/lu";
import { z } from "zod";

const formSchema = z.object({
  video: z.string().optional(),
  summary: z.string().min(1, { message: "Summary is required" }),
  additional_link: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const formFields: FormField<FormSchemaType>[] = [
  {
    name: "video",
    type: FormFieldType.Button,
    label: "Video Respond",
    icon: <LuCamera />,
    fieldData: { children: "Record a video" },
  },
  {
    name: "summary",
    type: FormFieldType.TextArea,
    label: "Summary",
    fieldData: { showCharacterCount: true, maxLength: 164 },
    description: "Enter design feedback summary",
    descriptionPosition: "bottom",
  },
  {
    name: "additional_link",
    type: FormFieldType.TextField,
    label: "Additional Link",
  },
];

export const Route = createFileRoute("/_auth/_app-layout/project/$id/respond")({
  component: ProjectRespond,
});

function ProjectRespond() {
  const { id } = Route.useParams();

  const navigate = useNavigate();

  const { data: user } = useAuthUser();

  const { mutateAsync: createProjectResponse, isPending } =
    useCreateProjectResponse();
  const {
    mutateAsync: updateProjectJammerStatus,
    isPending: isJammerStatusPending,
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
        video_link: data.video,
      },
    });

    await updateProjectJammerStatus({
      projectId: id,
      userId: user.id,
    });

    await navigate({
      to: "/project/$id",
      params: { id },
    });
  };

  return (
    <div className="px-5 py-10 sm:px-8 sm:py-5 space-y-6 sm:space-y-8">
      <BackLink to="/project/$id" params={{ id }} />
      <Card className="shadow-none rounded-2xl max-w-card">
        <CardHeader className="pb-4 mb-4 border-b px-0 mx-4 pt-0 mt-6">
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

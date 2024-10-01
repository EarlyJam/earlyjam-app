import { useState } from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import UpsellConfirmBannerImage from "@/assets/svgs/UpsellConfirmBannerImage.tsx";
import UpsellConfirmServiceInfoBannerIcon from "@/assets/svgs/UpsellConfirmServiceInfoBannerIcon.tsx";
import BackLink from "@/components/shared-components/BackLink";
import Button from "@/components/shared-components/Button";
import TextArea from "@/components/shared-components/TextArea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import Heading1 from "@/components/ui/heading1.tsx";
import Heading3 from "@/components/ui/heading3.tsx";
import { getProfileFullName } from "@/helpers/profile";
import useCreateUpsellRequest from "@/hooks/mutations/useCreateUpsellRequest.ts";
import useProject from "@/hooks/queries/useProject.ts";
import useProjectJammers from "@/hooks/queries/useProjectJammers.tsx";
import { getNameInitials } from "@/utils";

export const Route = createFileRoute(
  "/_auth/_simple-layout/project/$id/upsell-confirm"
)({
  component: UpsellConfirm
});

function UpsellConfirm() {
  const { id: projectId } = Route.useParams();
  const navigate = useNavigate({ from: "/project/$id/upsell-confirm" });

  const { data: project } = useProject(projectId);
  const { data: projectJammers = [] } = useProjectJammers(projectId, {
    status: "completed"
  });
  const { mutateAsync: createUpsellRequest, isPending: isCreating } =
    useCreateUpsellRequest();

  const [description, setDescription] = useState("");
  const [jammers, setJammers] = useState<string[]>([]);

  const handleSubmit = async () => {
    if (jammers.length === 0) {
      return;
    }

    const upsellRequest = await createUpsellRequest({
      project_id: projectId,
      jammers,
      description,
      status: "pending"
    });

    void navigate({
      to: "/project/$id/upsell-checkout/$checkoutId",
      params: { checkoutId: upsellRequest.id.toString(), id: projectId }
    });
  };

  return (
    <div className="ml-28 mt-6 space-y-6">
      <BackLink
        title="Back to project details"
        to="/project/$id/status"
        params={{ id: projectId }}
      />
      <Heading3 className="font-black">Hire a Professional</Heading3>
      <div className="flex flex-row gap-8">
        <Card className="w-full max-w-196 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-black leading-6">
              {project?.product_name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-row items-center gap-2.5 rounded-lg bg-beige-secondary px-6 py-4">
              <UpsellConfirmServiceInfoBannerIcon />
              <p className="text-sm text-blue-secondary-dark">
                Our quick design fix service lets users get feedback and hire a
                professional to implement specific changes within 48 hours,
                focusing on one function or flow at a time.
              </p>
            </div>
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="text-base font-semibold leading-5.5 text-blue-secondary-dark">
                  Project feedbacks
                </p>
                <p className="text-blue-secondary-dark">
                  Which feedback did you want to incorporate into the design?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {projectJammers.map((projectJammer) => (
                  <label
                    key={projectJammer.id}
                    className="w-full cursor-pointer space-y-2 rounded-lg border border-gray-400-disable px-2 py-3"
                    htmlFor={projectJammer.id}
                  >
                    <div className="flex flex-row items-center">
                      <div className="flex grow flex-row items-center gap-2 px-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={projectJammer.profile.profile_image}
                          />
                          <AvatarFallback>
                            {getNameInitials(
                              getProfileFullName(projectJammer.profile)
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <p className="font-semibold">
                          {getProfileFullName(projectJammer.profile)}
                        </p>
                      </div>
                      <Checkbox
                        id={projectJammer.id}
                        className="h-5 w-5 rounded-md border-gray-400-disable data-[state=checked]:border-blue-secondary-dark data-[state=checked]:bg-transparent data-[state=checked]:text-blue-secondary-dark"
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setJammers((prev) => [
                              ...prev,
                              projectJammer.jammer_id
                            ]);
                          } else {
                            setJammers((prev) =>
                              prev.filter(
                                (id) => id !== projectJammer.jammer_id
                              )
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="px-2">
                      <p className="font-semibold text-blue-secondary-dark">
                        Design Feedback - {projectJammer.profile.first_name}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-blue-secondary-dark">
                Is there anything in the design that you want done?
              </p>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="max-w-140 flex w-full flex-row gap-4">
              <Button variant="outline">Cancel</Button>
              <Button
                loading={isCreating}
                disabled={isCreating}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="h-fit w-96 rounded-2xl bg-blue-secondary-dark">
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex flex-row items-start gap-4">
                <Heading1 className="text-gray-100">1</Heading1>
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold leading-6 text-gray-100">
                    Fill out the project form
                  </p>
                  <p className="text-sm leading-5 text-gray-100">
                    Tell us a bit about what you need after get feedback. What
                    would you want to implement to your design.
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start gap-4">
                <Heading1 className="text-gray-100">2</Heading1>
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold leading-6 text-gray-100">
                    Book a call to discuss detail
                  </p>
                  <p className="text-sm leading-5 text-gray-100">
                    Contact to us to get a full proposal
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-start gap-4">
                <Heading1 className="text-gray-100">3</Heading1>
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold leading-6 text-gray-100">
                    Kick off the project
                  </p>
                  <p className="text-sm leading-5 text-gray-100">
                    Finalize the details and get your project started
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg bg-blue-800 py-2">
                <p className="text-sm text-gray-50">
                  Implement your feedback in 48 hours for
                </p>
                <Heading3 className="font-black text-white">$200.00</Heading3>
              </div>
            </div>
          </div>
          <UpsellConfirmBannerImage />
        </div>
      </div>
    </div>
  );
}

import { useMemo } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { PiSealCheck } from "react-icons/pi";

import ProjectJammerReview from "@/components/page-components/JammerResponse/ProjectJammerReview.tsx";
import BackLink from "@/components/shared-components/BackLink";
import Button from "@/components/shared-components/Button";
import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import dayjs from "@/helpers/dayjs.ts";
import { getProfileFullName } from "@/helpers/profile";
import useUpdateProjectJammerStatus from "@/hooks/mutations/useUpdateProjectJammerStatus.ts";
import useProjectJammer from "@/hooks/queries/useProjectJammer.tsx";
import useProjectJammerResponse from "@/hooks/queries/useProjectJammerResponse.tsx";

export const Route = createFileRoute(
  "/_auth/_app-layout/project/$id/response/$jammer"
)({
  component: JammerResponse
});

function JammerResponse() {
  const { id: projectId, jammer: jammerId } = Route.useParams();

  const { data: projectJammer, refetch: refetchProjectJammer } =
    useProjectJammer(jammerId, projectId);
  const { data: projectJammerResponse } = useProjectJammerResponse(
    projectId,
    jammerId
  );
  const { mutateAsync: updateProjectJammerStatus, isPending } =
    useUpdateProjectJammerStatus("completed");

  const name = getProfileFullName(projectJammer?.profile);
  const duration = useMemo(
    () =>
      projectJammerResponse?.loom_video_duration
        ? dayjs
            .duration(projectJammerResponse.loom_video_duration, "seconds")
            .format("H[h]m[m]")
        : undefined,
    [projectJammerResponse?.loom_video_duration]
  );

  const loomVideoEmbedUrl = useMemo(
    () =>
      `https://www.loom.com/embed/${projectJammerResponse?.loom_video_id ?? ""}`,
    [projectJammerResponse?.loom_video_id]
  );

  const completeSession = () => {
    void updateProjectJammerStatus({ projectId: projectId, userId: jammerId });
    void refetchProjectJammer();
  };

  return (
    <div className="space-y-6 px-5 py-10 sm:space-y-8 sm:px-8 sm:py-5">
      <BackLink to="/project/$id/status" params={{ id: projectId }} />
      <div className="max-w-card space-y-10">
        <div className="space-y-6">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="h-13.5 w-13.5">
              <AvatarImage src={projectJammer?.profile.profile_image} />
            </Avatar>
            <div className="space-y-1">
              <p className="max-w-64 truncate text-lg font-semibold text-blue-secondary-dark">
                Design Feedback - {name}
              </p>
              <div className="flex flex-row items-center gap-2">
                <p className="text-sm text-gray-700">Video Player</p>
                <span className="h-1 w-1 rounded-full bg-gray-700" />
                <p className="text-sm text-gray-700">{duration}</p>
              </div>
            </div>
          </div>
          <iframe
            className="h-96 w-full rounded-2xl"
            src={loomVideoEmbedUrl}
          ></iframe>
        </div>
        {projectJammer?.status === "completed" ? (
          <div className="space-y-4">
            <div className="flex w-full flex-row items-center gap-2 rounded bg-green-100 px-4 py-2 text-green-700">
              <PiSealCheck className="h-4 w-4" />
              <p className="text-sm font-semibold">Order completed !</p>
            </div>
            <ProjectJammerReview projectId={projectId} jammerId={jammerId} />
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <Button
              className="w-auto"
              loading={isPending}
              disabled={isPending}
              onClick={completeSession}
            >
              Complete Session
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import ProjectView from "@/components/page-components/Project/ProjectView";
import BackLink from "@/components/shared-components/BackLink";
import { UserType } from "@/enums/user";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import useProject from "@/hooks/queries/useProject";
import useProjectJammer from "@/hooks/queries/useProjectJammer";

export const Route = createFileRoute("/_auth/_app-layout/project/$id/")({
  component: Project
});

function Project() {
  const { id } = Route.useParams();

  const { data: profile } = useAuthProfile();
  const { data: project } = useProject(id);
  const { data: jammerProject } = useProjectJammer(profile?.id, id);

  const status =
    profile?.user_type === UserType.Jammer
      ? jammerProject?.status
      : project?.status;

  return (
    <div className="space-y-8 overflow-auto px-5 py-10 sm:pl-8 sm:pr-28 sm:pt-5">
      <BackLink to="/" />
      {project && (
        <ProjectView project={project} status={status ?? "awaiting_response"} />
      )}
    </div>
  );
}

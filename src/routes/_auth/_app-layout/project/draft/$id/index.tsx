import { createFileRoute } from "@tanstack/react-router";

import ProjectView from "@/components/page-components/Project/ProjectView";
import BackLink from "@/components/shared-components/BackLink";
import useProjectDraft from "@/hooks/queries/useProjectDraft";

export const Route = createFileRoute("/_auth/_app-layout/project/draft/$id/")({
  component: ProjectDraft
});

function ProjectDraft() {
  const { id } = Route.useParams();

  const { data: project } = useProjectDraft(id);

  return (
    <div className="space-y-8 overflow-auto px-5 py-10 sm:pl-8 sm:pr-28 sm:pt-5">
      <BackLink to="/" />
      {project && <ProjectView project={project} status="draft" />}
    </div>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import ProjectForm from "@/components/page-components/CreateProject/ProjectForm";
import useProject from "@/hooks/queries/useProject";

export const Route = createFileRoute("/_auth/_simple-layout/project/[id]/edit")({
  component: ProjectEdit
});

function ProjectEdit() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data: project } = useProject(id);

  if (!project) return <></>;

  return (
    <ProjectForm
      project={project}
      mode="edit"
      onSubmitDone={() => {
        void navigate({ to: "/project/[id]/edit", params: { id } });
      }}
    />
  );
}

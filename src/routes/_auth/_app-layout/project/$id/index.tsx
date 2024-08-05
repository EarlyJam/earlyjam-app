import LeftSection from "@/components/page-components/Project/LeftSection";
import RightSection from "@/components/page-components/Project/RightSection";
import BackLink from "@/components/shared-components/BackLink";
import useAuthUser from "@/hooks/queries/useAuthUser";
import useProject from "@/hooks/queries/useProject";
import useProjectJammer from "@/hooks/queries/useProjectJammer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_app-layout/project/$id/")({
  component: Project,
});

function Project() {
  const { id } = Route.useParams();

  const { data: user } = useAuthUser();
  const { data: project } = useProject(id);
  const { data: jammerProject } = useProjectJammer(user?.id, id);

  return (
    <div className="py-10 px-5 sm:pl-8 sm:pt-5 sm:pr-28 space-y-8 overflow-auto">
      <BackLink to="/" />
      {project && (
        <div className="flex flex-col-reverse sm:flex-row gap-7">
          <LeftSection project={project} />
          <RightSection project={project} projectJammer={jammerProject} />
        </div>
      )}
    </div>
  );
}

import { Project, ProjectStatus } from "@/types/project";
import { ProjectDraft } from "@/types/projectDraft";

import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

type ProjectViewProps = {
  project: Project | ProjectDraft;
  status: ProjectStatus | "draft";
};

function ProjectView(props: ProjectViewProps) {
  const { project, status } = props;

  return (
    <div className="flex flex-col-reverse gap-7 sm:flex-row sm:items-start">
      <LeftSection project={project} />
      <RightSection project={project} status={status} />
    </div>
  );
}

export default ProjectView;

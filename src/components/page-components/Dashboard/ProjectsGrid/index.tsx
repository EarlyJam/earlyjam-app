import { UserType } from "@/enums/user";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { ProjectStatus } from "@/types/project";

import ClientProjectDraftsGrid from "./ClientProjectDraftsGrid";
import ClientProjectsGrid from "./ClientProjectsGrid";
import JammerProjectsGrid from "./JammerProjectsGrid";

type ProjectsGridProps = {
  page: number;
  status?: ProjectStatus | "drafts";
  onPageChange: (page: number) => void;
};

function ProjectsGrid(props: ProjectsGridProps) {
  const { page, onPageChange, status = "awaiting_response" } = props;

  const { data: profile } = useAuthProfile();

  if (!profile) return <></>;

  if (status === "drafts") {
    return (
      <ClientProjectDraftsGrid
        userId={profile.id}
        page={page}
        onPageChange={onPageChange}
      />
    );
  }

  if (profile.user_type === UserType.Client) {
    return (
      <ClientProjectsGrid
        userId={profile.id}
        page={page}
        status={status}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <JammerProjectsGrid
      userId={profile.id}
      page={page}
      status={status}
      onPageChange={onPageChange}
    />
  );
}

export default ProjectsGrid;

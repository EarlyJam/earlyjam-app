import ProjectGridItem from "@/components/page-components/Dashboard/ProjectsGrid/ProjectGridItem";
import ProjectGridItemSkeleton from "@/components/page-components/Dashboard/ProjectsGrid/ProjectGridItemSkeleton";
import Pagination from "@/components/shared-components/Pagination";
import useAuthUser from "@/hooks/queries/useAuthUser";
import useJammerProjects from "@/hooks/queries/useJammerProjects";
import { ProjectJammer } from "@/types/project";

type ProjectsGridProps = {
  page: number;
  status?: ProjectJammer["status"];
  onPageChange: (page: number) => void;
};

function ProjectsGrid(props: ProjectsGridProps) {
  const { page, onPageChange, status = "awaiting_response" } = props;

  const { data: user } = useAuthUser();
  const {
    data: projectData = { data: [], count: 0, range: [0, 0] },
    isLoading,
    refetch,
  } = useJammerProjects(user?.id, page - 1, 10, {
    status,
  });

  const { data: projects = [], count: totalCount, range } = projectData;

  const handleStatusChange = () => {
    void refetch();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
        {isLoading &&
          Array(5)
            .fill(null)
            .map((_, index) => (
              <ProjectGridItemSkeleton
                key={`project-skeleton-${index.toString()}`}
              />
            ))}
        {!isLoading &&
          projects.map((project) => (
            <ProjectGridItem
              key={project.id}
              project={project}
              onStatusChange={handleStatusChange}
            />
          ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3">
        <p className="text-gray-600-secondary text-sm font-normal">
          {range[0] + 1}-{range[1] + 1} of {totalCount ?? 0} projects
        </p>
        <Pagination
          name="projects"
          totalPages={(totalCount ?? 0) / 10}
          currentPage={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default ProjectsGrid;

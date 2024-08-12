import Pagination from "@/components/shared-components/Pagination";

import ProjectGridItem, {
  GridItem,
  ProjectGridItemProps
} from "./ProjectGridItem";
import ProjectGridItemSkeleton from "./ProjectGridItemSkeleton";

type ProjectsGridContentProps = {
  data: GridItem[];
  draft?: boolean;
  isLoading: boolean;
  range: [number, number];
  totalCount: number;
  page: number;
  menuItems?: ProjectGridItemProps["menuItems"];
  loadingIds?: string[];
  onPageChange: (page: number) => void;
};

function ProjectsGridContent(props: ProjectsGridContentProps) {
  const {
    data,
    draft,
    isLoading,
    range,
    totalCount,
    page,
    onPageChange,
    menuItems = [],
    loadingIds = []
  } = props;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 sm:gap-5 lg:grid-cols-2">
        {isLoading &&
          Array(5)
            .fill(null)
            .map((_, index) => (
              <ProjectGridItemSkeleton
                key={`project-skeleton-${index.toString()}`}
              />
            ))}
        {!isLoading &&
          data.map((data) => (
            <ProjectGridItem
              key={data.id}
              data={data}
              draft={draft}
              menuItems={menuItems}
              isLoading={loadingIds.includes(data.id)}
            />
          ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm font-normal text-gray-600-secondary">
          {range[0] + 1}-{range[1] + 1} of {totalCount} projects
        </p>
        <Pagination
          name="projects"
          totalPages={totalCount / 10}
          currentPage={page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default ProjectsGridContent;

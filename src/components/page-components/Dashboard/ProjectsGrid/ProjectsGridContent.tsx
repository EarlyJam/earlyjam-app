import Pagination from "@/components/shared-components/Pagination";
import { MenuItem } from "@/types/global.ts";

import ProjectGridItem, { GridItem } from "./ProjectGridItem";
import ProjectGridItemSkeleton from "./ProjectGridItemSkeleton";

type ProjectsGridContentProps = {
  data: GridItem[];
  draft?: boolean;
  isLoading: boolean;
  range: [number, number];
  totalCount: number;
  page: number;
  menuItems?: MenuItem[];
  loadingIds?: string[];
  onPageChange: (page: number) => void;
  onActionMenuClick?(value: string, dataId: string): void;
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
    loadingIds = [],
    onActionMenuClick
  } = props;
  return (
    <div className="max-w-200 space-y-6">
      <div className="flex flex-col gap-3 sm:gap-5">
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
              onActionMenuClick={(value) => onActionMenuClick?.(value, data.id)}
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

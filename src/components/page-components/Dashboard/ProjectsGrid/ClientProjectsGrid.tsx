import { useMemo, useState } from "react";

import { useNavigate } from "@tanstack/react-router";
import { LuDelete, LuPencil } from "react-icons/lu";

import { GridItem } from "@/components/page-components/Dashboard/ProjectsGrid/ProjectGridItem";
import useDeleteProject from "@/hooks/mutations/useDeleteProject";
import { default as useClientProjects } from "@/hooks/queries/useClientProjects";
import { ProjectStatus } from "@/types/project";

import ProjectsGridContent from "./ProjectsGridContent";

type ClientProjectsGridProps = {
  userId: string;
  page: number;
  status?: ProjectStatus;
  onPageChange: (page: number) => void;
};

function ClientProjectsGrid(props: ClientProjectsGridProps) {
  const { userId, page, status = "awaiting_response", onPageChange } = props;
  console.log(status);

  const navigate = useNavigate();

  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const {
    data: projectData = { data: [], count: 0, range: [0, 0] },
    isLoading
  } = useClientProjects(userId, page - 1, 10, {
    status
  });
  const { mutateAsync: deleteProject } = useDeleteProject();

  const data = useMemo<GridItem[]>(
    () =>
      projectData.data.map((data) => ({
        id: data.id,
        name: data.product_name,
        status: data.status ?? "awaiting_response",
        createdAt: data.created_at,
        productType: data.product_type,
        jammers: ["awaiting_response"].includes(status)
          ? []
          : data.jammers.map((jammer) => ({
              id: jammer.id,
              name: `${jammer.profile.first_name} ${jammer.profile.last_name}`,
              status: jammer.status,
              profileImage: jammer.profile.profile_image
            }))
      })),
    [projectData.data, status]
  );

  const handleDelete = async (id: string) => {
    setLoadingIds((prev) => [...prev, id]);

    await deleteProject(id);

    setLoadingIds((prev) => prev.filter((i) => i !== id));
  };

  const handleEdit = (id: string) => {
    void navigate({ to: "/project/$id/edit", params: { id } });
  };

  return (
    <ProjectsGridContent
      data={data}
      isLoading={isLoading}
      range={[projectData.range[0], projectData.range[1]]}
      totalCount={projectData.count ?? 0}
      page={page}
      onPageChange={onPageChange}
      menuItems={[
        {
          value: "edit",
          label: "Edit",
          icon: <LuPencil />
        },
        {
          value: "delete",
          label: "Delete",
          icon: <LuDelete />,
          className: "text-functional-error-100"
        }
      ]}
      onActionMenuClick={(value, id) => {
        if (value === "edit") {
          handleEdit(id);
        } else if (value === "delete") {
          void handleDelete(id);
        }
      }}
      loadingIds={loadingIds}
    />
  );
}

export default ClientProjectsGrid;

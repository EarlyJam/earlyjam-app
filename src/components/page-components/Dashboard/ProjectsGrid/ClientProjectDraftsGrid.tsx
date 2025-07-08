import { useMemo, useState } from "react";

import { useNavigate } from "@tanstack/react-router";
import { LuDelete, LuPencil } from "react-icons/lu";

import { GridItem } from "@/components/page-components/Dashboard/ProjectsGrid/ProjectGridItem";
import useDeleteProjectDraft from "@/hooks/mutations/useDeleteProjectDraft";
import useProjectDrafts from "@/hooks/queries/useProjectDrafts";

import ProjectsGridContent from "./ProjectsGridContent";

type ClientProjectDraftsGridProps = {
  userId: string;
  page: number;
  onPageChange: (page: number) => void;
};

function ClientProjectDraftsGrid(props: ClientProjectDraftsGridProps) {
  const { userId, page, onPageChange } = props;

  const navigate = useNavigate();

  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const {
    data: projectData = { data: [], count: 0, range: [0, 0] },
    isLoading,
    refetch
  } = useProjectDrafts(userId, page - 1, 10);
  const { mutateAsync: deleteProjectDraft } = useDeleteProjectDraft();

  const data = useMemo<GridItem[]>(
    () =>
      projectData.data.map((data) => ({
        id: data.id,
        name: data.product_name ?? "",
        status: "draft",
        createdAt: data.created_at ?? "",
        productType: data.product_type ?? "",
        description: data.product_description,
        industry: data.product_industry,
        jammers: []
      })),
    [projectData.data]
  );

  const handleEdit = (id: string) => {
    void navigate({ to: "/project/draft/[id]/edit", params: { id } });
  };

  const handleDelete = async (id: string) => {
    setLoadingIds((prev) => [...prev, id]);

    await deleteProjectDraft(id);
    await refetch();

    setLoadingIds((prev) => prev.filter((i) => i !== id));
  };

  return (
    <ProjectsGridContent
      draft
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

export default ClientProjectDraftsGrid;

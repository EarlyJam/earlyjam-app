import { useCallback, useMemo, useState } from "react";

import { useNavigate } from "@tanstack/react-router";
import { LuArrowRight, LuCheckCircle2, LuXCircle } from "react-icons/lu";

import { GridItem } from "@/components/page-components/Dashboard/ProjectsGrid/ProjectGridItem";
import useUpdateProjectJammerStatus from "@/hooks/mutations/useUpdateProjectJammerStatus";
import useAuthUser from "@/hooks/queries/useAuthUser";
import useJammerProjects from "@/hooks/queries/useJammerProjects";
import { MenuItem } from "@/types/global.ts";
import { ProjectStatus } from "@/types/project";

import ProjectsGridContent from "./ProjectsGridContent";

type JammerProjectsGridProps = {
  userId: string;
  page: number;
  status?: ProjectStatus;
  onPageChange: (page: number) => void;
};

function JammerProjectsGrid(props: JammerProjectsGridProps) {
  const { userId, page, status = "awaiting_response", onPageChange } = props;

  const navigate = useNavigate();

  const { data: user } = useAuthUser();
  const {
    data: projectData = { data: [], count: 0, range: [0, 0] },
    isLoading,
    refetch
  } = useJammerProjects(userId, page - 1, 10, {
    status
  });
  const { mutateAsync: acceptProject } =
    useUpdateProjectJammerStatus("accepted");
  const { mutateAsync: rejectProject } =
    useUpdateProjectJammerStatus("rejected");

  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const data = useMemo<GridItem[]>(
    () =>
      projectData.data.map((data) => ({
        id: data.project.id,
        name: data.project.product_name,
        status: data.status,
        createdAt: data.created_at,
        productType: data.project.product_type,
        description: data.project.product_description,
        industry: data.project.product_industry,
        jammers: []
      })),
    [projectData.data]
  );

  const handleRespond = useCallback(
    async (id: string) => {
      await navigate({ to: "/project/[id]/edit", params: { id } });
    },
    [navigate]
  );

  const handleAcceptProject = useCallback(
    async (id: string) => {
      if (!user) return;

      setLoadingIds((prev) => [...prev, id]);

      await acceptProject({
        projectId: id,
        userId: user.id
      });

      setLoadingIds((prev) => prev.filter((item) => item !== id));

      void refetch();
    },
    [acceptProject, refetch, user]
  );

  const handleRejectProject = useCallback(
    async (id: string) => {
      if (!user) return;

      setLoadingIds((prev) => [...prev, id]);

      await rejectProject({
        projectId: id,
        userId: user.id
      });

      setLoadingIds((prev) => prev.filter((item) => item !== id));

      void refetch();
    },
    [rejectProject, refetch, user]
  );

  const menuItems = useMemo<MenuItem[]>(() => {
    if (status === "awaiting_response") {
      return [
        {
          value: "accept",
          label: "Accept this session",
          icon: <LuCheckCircle2 />
        },
        {
          value: "reject",
          label: "Decline this session",
          icon: <LuXCircle />
        }
      ];
    }

    if (status === "accepted") {
      return [
        {
          value: "respond",
          label: "Respond",
          icon: <LuArrowRight />
        }
      ];
    }

    return [];
  }, [status]);

  return (
    <ProjectsGridContent
      data={data}
      isLoading={isLoading}
      range={[projectData.range[0], projectData.range[1]]}
      totalCount={projectData.count ?? 0}
      page={page}
      onPageChange={onPageChange}
      menuItems={menuItems}
      loadingIds={loadingIds}
      onActionMenuClick={(value, id) => {
        if (value === "accept") {
          void handleAcceptProject(id);
        } else if (value === "reject") {
          void handleRejectProject(id);
        } else if (value === "respond") {
          void handleRespond(id);
        }
      }}
    />
  );
}

export default JammerProjectsGrid;

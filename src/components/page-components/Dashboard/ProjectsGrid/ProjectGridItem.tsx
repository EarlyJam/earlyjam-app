import { useNavigate } from "@tanstack/react-router";

import Calendar from "@/assets/svgs/Calendar";
import Tag from "@/assets/svgs/Tag.tsx";
import ProjectGridItemSkeleton from "@/components/page-components/Dashboard/ProjectsGrid/ProjectGridItemSkeleton";
import ActionMenu from "@/components/shared-components/ActionMenu";
import ProjectStatusTag from "@/components/shared-components/ProjectStatusTag";
import Tooltip from "@/components/shared-components/Tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { INDUSTRY_OPTIONS_MAP } from "@/constants";
import { UserType } from "@/enums/user";
import dayjs from "@/helpers/dayjs";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { MenuItem } from "@/types/global.ts";
import { ProjectStatus } from "@/types/project";

export type GridItem = {
  id: string;
  name: string;
  status: ProjectStatus | "draft";
  createdAt: string;
  productType?: string;
  description?: string;
  industry?: string[];
  jammers: {
    id: string;
    name: string;
    status: ProjectStatus;
    profileImage: string | undefined;
  }[];
};

export type ProjectGridItemProps = {
  data: GridItem;
  draft?: boolean;
  isLoading?: boolean;
  menuItems?: MenuItem[];
  onActionMenuClick?(value: string): void;
};

function ProjectGridItem(props: ProjectGridItemProps) {
  const { data, draft, menuItems = [], onActionMenuClick, isLoading } = props;

  const navigate = useNavigate();

  const { data: user } = useAuthProfile();

  const tags =
    data.industry?.map((i) => INDUSTRY_OPTIONS_MAP.get(i)).join(", ") ?? "";

  const onCardClick = () => {
    if (user?.user_type === UserType.Jammer) {
      return navigate({ to: "/project/$id", params: { id: data.id } });
    }

    if (draft) {
      return navigate({ to: "/project/draft/$id", params: { id: data.id } });
    }

    void navigate({ to: "/project/$id/status", params: { id: data.id } });
  };

  if (isLoading) return <ProjectGridItemSkeleton />;

  return (
    <Card onClick={onCardClick}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-1">
              <Calendar />
              <p className="font-dm-sans text-sm font-normal">
                Expected end date: 11-03-2024
              </p>
            </div>
            <ProjectStatusTag status={data.status} />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-medium text-blue-secondary-dark">
              {data.name}
            </h2>
            <p className="font-dm-sans text-sys-on-surface-lighter text-sm">
              {data.description}
            </p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <Tag />
            <p className="font-dm-sans text-sm font-bold text-gray-700">
              Tags/Skills Needed
            </p>
            <Tooltip title={tags}>
              <p className="font-dm-sans overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap text-sm">
                {tags}
              </p>
            </Tooltip>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Tooltip title={dayjs(data.createdAt).format("LLL")}>
              <p className="font-dm-sans text-sys-on-surface-lighter text-sm">
                Posted {dayjs(data.createdAt).fromNow()}
              </p>
            </Tooltip>
            <ActionMenu menuItems={menuItems} onItemClick={onActionMenuClick} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectGridItem;

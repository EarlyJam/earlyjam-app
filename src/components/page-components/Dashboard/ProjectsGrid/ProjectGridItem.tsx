import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { LuArrowRight } from "react-icons/lu";

import Box from "@/assets/svgs/Box";
import Calendar from "@/assets/svgs/Calendar";
import ProjectGridItemSkeleton from "@/components/page-components/Dashboard/ProjectsGrid/ProjectGridItemSkeleton";
import ActionMenu from "@/components/shared-components/ActionMenu";
import AvatarGroup from "@/components/shared-components/AvatarGroup";
import ProjectStatusTag from "@/components/shared-components/ProjectStatusTag";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { UserType } from "@/enums/user";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { MenuItem } from "@/types/global.ts";
import { ProjectStatus } from "@/types/project";

export type GridItem = {
  id: string;
  name: string;
  status: ProjectStatus | "draft";
  createdAt: string;
  productType?: string;
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

  const { data: user } = useAuthProfile();

  if (isLoading) return <ProjectGridItemSkeleton />;

  return (
    <Card className="h-42">
      <CardContent className="flex h-full flex-col justify-between p-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center">
            <p className="grow text-lg font-semibold leading-6 text-gray-900">
              {data.name}
            </p>
            <ActionMenu menuItems={menuItems} onItemClick={onActionMenuClick} />
          </div>
          <div className="space-y-1 text-gray-700">
            <div className="flex flex-row items-center gap-4">
              <div className="h-4 w-4">
                <Calendar />
              </div>
              <p className="text-sm font-normal">
                Date Created:&nbsp;
                {dayjs(data.createdAt).format("MMM D, YYYY")}
              </p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="h-4 w-4">
                <Box />
              </div>
              <p className="text-sm font-normal">
                Product Type: {data.productType}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            {data.jammers.length > 0 && (
              <>
                <span className="text-sm font-semibold text-gray-700">
                  Jammers:
                </span>
                <AvatarGroup>
                  {data.jammers.map((jammer) => (
                    <Avatar
                      key={jammer.id}
                      className="h-7 w-7 border border-white"
                      tooltip={jammer.name}
                    >
                      <AvatarImage src={jammer.profileImage} />
                    </Avatar>
                  ))}
                </AvatarGroup>
              </>
            )}
            <ProjectStatusTag status={data.status} />
          </div>
          <Link
            to={
              user?.user_type === UserType.Jammer
                ? "/project/$id"
                : draft
                  ? "/project/draft/$id"
                  : "/project/$id/status"
            }
            params={{ id: data.id }}
          >
            <div className="flex flex-row items-center gap-2 border-b border-blue-secondary-dark">
              <p className="text-sm font-semibold leading-4.5 text-blue-secondary-dark">
                View details
              </p>
              <LuArrowRight className="h-4.5 w-4.5 text-blue-secondary-dark" />
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectGridItem;

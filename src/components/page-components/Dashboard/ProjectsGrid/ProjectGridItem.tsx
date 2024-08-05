import Box from "@/assets/svgs/Box";
import Calendar from "@/assets/svgs/Calendar";
import ProjectGridItemSkeleton from "@/components/page-components/Dashboard/ProjectsGrid/ProjectGridItemSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProjectStatusLabel } from "@/helpers/project";
import useUpdateProjectJammerStatus from "@/hooks/mutations/useUpdateProjectJammerStatus";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { JammerProjectListItem } from "@/types/project";
import { cn } from "@/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { LuArrowRight, LuMoreHorizontal, LuXCircle } from "react-icons/lu";

type ProjectGridItemProps = {
  project: JammerProjectListItem;
  onStatusChange?: () => void;
};

function ProjectGridItem(props: ProjectGridItemProps) {
  const { project } = props.project;

  const navigate = useNavigate();

  const { data: user } = useAuthUser();
  const { mutateAsync: acceptProject, isPending: isAccepting } =
    useUpdateProjectJammerStatus("accepted");
  const { mutateAsync: rejectProject, isPending: isRejecting } =
    useUpdateProjectJammerStatus("rejected");

  const handleAcceptProject = async () => {
    if (!user) return;

    await acceptProject({
      projectId: project.id,
      userId: user.id,
    });

    props.onStatusChange?.();
  };

  const handleRejectProject = async () => {
    if (!user) return;

    await rejectProject({
      projectId: project.id,
      userId: user.id,
    });

    props.onStatusChange?.();
  };

  const handleRespond = async () => {
    await navigate({ to: "/project/$id/respond", params: { id: project.id } });
  };

  const isLoading = isAccepting || isRejecting;

  if (isLoading) return <ProjectGridItemSkeleton />;

  return (
    <Card className="h-42">
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center">
            <p className="text-lg leading-6 font-semibold text-gray-900 grow">
              {project.product_name}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-auto p-0 h-auto">
                  <LuMoreHorizontal className="h-5 w-5 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {props.project.status === "awaiting_response" && (
                    <>
                      <DropdownMenuItem onClick={handleAcceptProject}>
                        <LuXCircle className="mr-2 h-4 w-4" />
                        <span>Accept this session</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleRejectProject}>
                        <LuXCircle className="mr-2 h-4 w-4" />
                        <span>Decline this session</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  {props.project.status === "accepted" && (
                    <DropdownMenuItem onClick={handleRespond}>
                      <LuArrowRight className="mr-2 h-4 w-4" />
                      <span>Respond</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-gray-700 space-y-1">
            <div className="flex flex-row items-center gap-4">
              <div className="w-4 h-4">
                <Calendar />
              </div>
              <p className="text-sm font-normal">
                Date Created:&nbsp;
                {props.project.created_at
                  ? dayjs(props.project.created_at).format("MMM D, YYYY")
                  : ""}
              </p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="w-4 h-4">
                <Box />
              </div>
              <p className="text-sm font-normal">
                Product Type: {project.product_type}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div
            className={cn("px-2 py-1 bg-functional-warning-100", {
              "bg-functional-success-100": props.project.status === "accepted",
              "bg-functional-link-100": props.project.status === "closed",
            })}
          >
            <p
              className={cn(
                "text-sm font-semibold text-functional-warning-500",
                {
                  "text-functional-success-500":
                    props.project.status === "accepted",
                  "text-functional-link-500": props.project.status === "closed",
                },
              )}
            >
              {getProjectStatusLabel(props.project.status)}
            </p>
          </div>
          <Link to="/project/$id" params={{ id: project.id }}>
            <div className="flex flex-row items-center gap-2 border-b border-blue-secondary-dark">
              <p className="text-sm font-semibold text-blue-secondary-dark leading-4.5">
                View details
              </p>
              <LuArrowRight className="w-4.5 h-4.5 text-blue-secondary-dark" />
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProjectGridItem;

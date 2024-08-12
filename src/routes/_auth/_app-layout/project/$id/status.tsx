import { createFileRoute, Link } from "@tanstack/react-router";
import { LuChevronRight } from "react-icons/lu";

import DataBlock from "@/components/page-components/Project/DataBlock";
import BackLink from "@/components/shared-components/BackLink";
import Button from "@/components/shared-components/Button";
import ProjectStatusTag from "@/components/shared-components/ProjectStatusTag";
import Table from "@/components/shared-components/Table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Heading3 from "@/components/ui/heading3";
import Heading5 from "@/components/ui/heading5";
import dayjs from "@/helpers/dayjs";
import { getProfileFullName } from "@/helpers/profile";
import useProject from "@/hooks/queries/useProject";
import useProjectJammers from "@/hooks/queries/useProjectJammers";
import { cn, convertToLabel, getNameInitials } from "@/utils";

export const Route = createFileRoute("/_auth/_app-layout/project/$id/status")({
  component: ProjectStatus
});

function ProjectStatus() {
  const { id: projectId } = Route.useParams();

  const { data: project } = useProject(projectId);
  const { data: projectJammers = [] } = useProjectJammers(projectId);

  return (
    <div className="overflow-auto">
      <div className="mx-8 my-5 space-y-8">
        <BackLink to="/" />
        <div className="space-y-2">
          <div className="flex flex-row items-center gap-6">
            <Heading3>{project?.product_name}</Heading3>
            <ProjectStatusTag status={project?.status} />
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm text-gray-700">{project?.product_type}</p>
            {/* <span className="h-1 w-1 rounded-full bg-gray-700" />
          <p className="text-sm text-gray-700">Beauty and Wellness</p> */}
          </div>
        </div>
        <div className="flex flex-row items-start gap-8">
          <div className="min-w-table max-w-card grow">
            <Table
              columnDefs={[
                {
                  headerName: "CREATED BY",
                  field: "created_by",
                  render(_, row) {
                    const name = getProfileFullName(row.profile);
                    return (
                      <div className="flex flex-row items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={row.profile.profile_image} />
                          <AvatarFallback>
                            {getNameInitials(name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-semibold text-gray-700">
                          {name}
                        </span>
                      </div>
                    );
                  }
                },
                {
                  headerName: "NAME",
                  field: "name",
                  render(_, row) {
                    const name = getProfileFullName(row.profile);
                    return (
                      <div className="space-y-1">
                        <p className="max-w-64 truncate text-sm font-semibold text-blue-secondary-dark">
                          Design Feedback - {name}
                        </p>
                        <div className="flex flex-row items-center gap-2">
                          <p className="text-sm text-gray-700">Video Player</p>
                          <span className="h-1 w-1 rounded-full bg-gray-700" />
                          <p className="text-sm text-gray-700">1h30m</p>
                        </div>
                      </div>
                    );
                  }
                },
                {
                  headerName: "STATUS",
                  field: "status",
                  textAlign: "center",
                  render(value) {
                    return (
                      <div className="flex flex-row items-center justify-center gap-2">
                        <span
                          className={cn(
                            "h-1 w-1 rounded-full bg-functional-warning-500",
                            {
                              "bg-functional-success-500": value === "accepted",
                              "bg-functional-link-500": value === "closed",
                              "bg-gray-600-secondary": value === "draft"
                            }
                          )}
                        />
                        <p
                          className={cn(
                            "text-sm font-semibold text-functional-warning-500",
                            {
                              "text-functional-success-500":
                                value === "accepted",
                              "text-functional-link-500": value === "closed",
                              "text-gray-600-secondary": value === "draft"
                            }
                          )}
                        >
                          {convertToLabel(value as string)}
                        </p>
                      </div>
                    );
                  }
                },
                {
                  headerName: "UPDATED ON",
                  field: "updated_at",
                  textAlign: "center",
                  render(value) {
                    return dayjs.utc(value as string).format("MMM D, YYYY");
                  }
                }
              ]}
              data={projectJammers}
            />
          </div>
          <div className="w-70 shrink-0 space-y-4 rounded-2xl border border-gray-300 bg-white px-4 py-5">
            <div className="flex flex-row items-center justify-between border-b border-b-gray-300 pb-4">
              <Heading5>Project brief</Heading5>
              {project?.id && (
                <Link to="/project/$id/edit" params={{ id: project.id }}>
                  <Button
                    className="h-auto w-auto px-6 py-2 text-sm font-semibold leading-4 text-blue-secondary-dark"
                    variant="outline"
                  >
                    Edit
                  </Button>
                </Link>
              )}
            </div>
            <div className="space-y-6">
              <DataBlock
                title="Scenario"
                value={project?.product_description ?? ""}
              />
              <DataBlock
                title="URL/Link"
                value={
                  <Link
                    to={project?.project_link?.[0]?.url}
                    target="_blank"
                    className="text-sm font-semibold leading-4.5 text-blue-primary-500 underline underline-offset-4"
                  >
                    {project?.project_link?.[0]?.url}
                  </Link>
                }
              />
              <DataBlock
                title="Date Created"
                value={dayjs.utc(project?.created_at).format("MMM D, YYYY")}
              />
              <DataBlock
                title="Review End"
                value={dayjs.utc(project?.updated_at).format("MMM D, YYYY")}
              />
              {project?.id && (
                <Link
                  to="/project/$id"
                  params={{ id: project.id }}
                  className="block w-fit"
                >
                  <div className="flex w-auto flex-row items-center gap-2 border-b border-blue-secondary-dark">
                    <p className="text-sm font-semibold leading-4.5 text-blue-secondary-dark">
                      View details
                    </p>
                    <LuChevronRight className="h-4.5 w-4.5 text-blue-secondary-dark" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

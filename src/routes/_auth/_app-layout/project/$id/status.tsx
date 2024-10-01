import { useMemo } from "react";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LuChevronRight } from "react-icons/lu";

import LogoFull from "@/assets/svgs/LogoFull.tsx";
import UpsellBannerLogo from "@/assets/svgs/UpsellBannerLogo.tsx";
import UpsellBannerPatternLeft from "@/assets/svgs/UpsellBannerPatternLeft.tsx";
import UpsellBannerPatternRight from "@/assets/svgs/UpsellBannerPatternRight.tsx";
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
import useUpsellRequests from "@/hooks/queries/useUpsellRequests.tsx";
import { ProjectJammerListItem } from "@/types/project.ts";
import { cn, convertToLabel, getNameInitials } from "@/utils";

export const Route = createFileRoute("/_auth/_app-layout/project/$id/status")({
  component: ProjectStatus
});

function ProjectStatus() {
  const { id: projectId } = Route.useParams();

  const navigate = useNavigate();

  const { data: project } = useProject(projectId);
  const { data: projectJammers = [] } = useProjectJammers(projectId);
  const { data: upsellRequests = [] } = useUpsellRequests(projectId);

  const showUpsellBanner = projectJammers.some(
    (jammer) => jammer.status === "completed"
  );

  const tableData = useMemo(() => {
    const upsellData = upsellRequests.map<
      ProjectJammerListItem & { group: string }
    >((ur) => ({
      group: "Design Implementation",
      profile: {
        first_name: "EarlyJam",
        last_name: "Team"
      },
      status: "in_progress",
      updated_at: ur.created_at,
      id: ur.id.toString(),
      project_id: ur.project_id,
      jammer_id: "",
      created_at: ur.created_at
    }));
    const jammerData = projectJammers.map((pj) => ({
      ...pj,
      group: "Design Feedback"
    }));

    return [...upsellData, ...jammerData];
  }, [projectJammers, upsellRequests]);

  return (
    <div className="w-full overflow-auto">
      <div className="w-full max-w-262">
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
            <div className="min-w-table grow">
              <Table
                columnDefs={[
                  {
                    headerName: "CREATED BY",
                    field: "created_by",
                    render(_, row) {
                      const name = getProfileFullName(row.profile);
                      return (
                        <div className="flex flex-row items-center gap-2">
                          {row.group === "Design Implementation" ? (
                            <div className="flex h-6 w-6 flex-row items-center justify-center rounded-full bg-blue-secondary-dark">
                              <LogoFull variant="light" className="w-3/4" />
                            </div>
                          ) : (
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={row.profile.profile_image} />
                              <AvatarFallback>
                                {getNameInitials(name)}
                              </AvatarFallback>
                            </Avatar>
                          )}
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
                            <p className="text-sm text-gray-700">
                              Video Player
                            </p>
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
                                "bg-functional-success-400":
                                  value === "in_progress",
                                "bg-functional-success-500":
                                  value === "accepted" || value === "completed",
                                "bg-functional-link-500": value === "closed",
                                "bg-gray-600-secondary": value === "draft"
                              }
                            )}
                          />
                          <p
                            className={cn(
                              "text-sm font-semibold text-functional-warning-500",
                              {
                                "text-functional-success-400":
                                  value === "in_progress",
                                "text-functional-success-500":
                                  value === "accepted" || value === "completed",
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
                data={tableData}
                groupBy="group"
                onRowClick={(jammer) => {
                  if (
                    jammer.status === "closed" ||
                    jammer.status === "completed"
                  ) {
                    void navigate({
                      to: "/project/$id/response/$jammer",
                      params: { jammer: jammer.jammer_id, id: projectId }
                    });
                  }
                }}
              />
              {showUpsellBanner && (
                <div className="relative rounded-lg border-white/10 bg-blue-secondary-dark">
                  <div className="pointer-events-none absolute left-0 top-0">
                    <UpsellBannerPatternLeft />
                  </div>
                  <div className="pointer-events-none absolute right-0 top-0">
                    <UpsellBannerPatternRight />
                  </div>
                  <div className="relative z-10 p-6">
                    <div className="flex flex-row items-center justify-between gap-6">
                      <div className="space-y-2">
                        <p className="font-fraunces text-xl font-semibold leading-6 text-gray-50">
                          Let us design for you in 48 hours!
                        </p>
                        <p className="text-xs font-black text-gray-400-disable">
                          With 250$ can actually do this design work and update
                          your work based on the feedback. Book now!
                        </p>
                        <div>
                          <Link
                            to="/project/$id/upsell-confirm"
                            params={{ id: projectId }}
                          >
                            <Button className="h-auto w-auto cursor-pointer px-6 py-2 text-sm">
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <UpsellBannerLogo />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-70 shrink-0 space-y-4 rounded-2xl border border-gray-300 bg-white px-4 py-5">
              <div className="flex flex-row items-center justify-between border-b border-b-gray-300 pb-4">
                <Heading5>Project brief</Heading5>
                {project?.id && (
                  <Link
                    to="/project/$id/edit"
                    params={{ id: project.id }}
                    search={{}}
                  >
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
    </div>
  );
}

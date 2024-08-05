import SectionDataBlock from "@/components/page-components/Project/SectionDataBlock";
import Button from "@/components/shared-components/Button";
import Divider from "@/components/ui/divider";
import { getProjectStatusLabel } from "@/helpers/project";
import useUpdateProjectJammerStatus from "@/hooks/mutations/useUpdateProjectJammerStatus";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { Project, ProjectJammer } from "@/types/project";
import { cn } from "@/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { LuXCircle } from "react-icons/lu";

type RightSectionProps = {
  project: Project;
  projectJammer?: ProjectJammer;
};

function RightSection(props: RightSectionProps) {
  const { project, projectJammer } = props;

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

    await navigate({ to: "/project/$id/respond", params: { id: project.id } });
  };

  const handleRejectProject = async () => {
    if (!user) return;

    await rejectProject({
      projectId: project.id,
      userId: user.id,
    });

    await navigate({ to: "/" });
  };

  return (
    <div className="flex flex-col items-start px-4 sm:px-6 py-8 bg-white rounded-2xl w-full sm:max-w-80 shrink-0">
      <div className="space-y-7.5">
        <div className="space-y-5">
          <div
            className={cn("px-2 py-1 bg-functional-warning-100 w-fit", {
              "bg-functional-success-100": projectJammer?.status === "accepted",
              "bg-functional-link-100": projectJammer?.status === "closed",
            })}
          >
            <p
              className={cn(
                "text-sm font-semibold text-functional-warning-500",
                {
                  "text-functional-success-500":
                    projectJammer?.status === "accepted",
                  "text-functional-link-500":
                    projectJammer?.status === "closed",
                },
              )}
            >
              {getProjectStatusLabel(projectJammer?.status)}
            </p>
          </div>
          <SectionDataBlock
            title="Link to your project"
            type="link-list"
            value={project.project_link?.map((item) => item.url) ?? []}
          />
        </div>
        <div className="space-y-4">
          {projectJammer?.status === "awaiting_response" && (
            <>
              <Button
                className="h-14"
                onClick={handleAcceptProject}
                loading={isAccepting}
                disabled={isAccepting || isRejecting}
              >
                Accept this session
              </Button>
              <Button
                variant="outline"
                className="h-14 text-gray-600-secondary border-gray-600-secondary"
                startIcon={<LuXCircle className="h-5 w-5 mb-0.5" />}
                onClick={handleRejectProject}
                loading={isRejecting}
                disabled={isAccepting || isRejecting}
              >
                Decline this session
              </Button>
            </>
          )}
          {projectJammer?.status === "accepted" && (
            <Link to="/project/$id/respond" params={{ id: project.id }}>
              <Button className="h-14">Respond</Button>
            </Link>
          )}
        </div>
        <Divider className="border-dashed" />
        <div className="grid grid-cols-2 gap-3">
          <SectionDataBlock
            title="Subject"
            type="text"
            value={project.product_name}
          />
          <SectionDataBlock
            title="Product type"
            type="text"
            value={project.product_type ?? ""}
          />
          <SectionDataBlock
            title="Date Created"
            type="text"
            value={dayjs(project.created_at).format("MMM D, YYYY")}
          />
          <SectionDataBlock
            title="Review End"
            type="text"
            value={dayjs(project.created_at).format("MMM D, YYYY")}
          />
        </div>
        <SectionDataBlock
          title="Industry"
          type="chip"
          value={project.product_industry ?? []}
        />
      </div>
    </div>
  );
}

export default RightSection;

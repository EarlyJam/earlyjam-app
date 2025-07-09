import { Link, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { LuXCircle } from "react-icons/lu";

import SectionDataBlock from "@/components/page-components/Project/SectionDataBlock";
import Button from "@/components/shared-components/Button";
import ProjectStatusTag from "@/components/shared-components/ProjectStatusTag";
import Divider from "@/components/ui/divider";
import Heading4 from "@/components/ui/heading4";
import { UserType } from "@/enums/user";
import useUpdateProjectJammerStatus from "@/hooks/mutations/useUpdateProjectJammerStatus";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { Project, ProjectStatus } from "@/types/project";
import { ProjectDraft } from "@/types/projectDraft";

import DataBlock from "../DataBlock";

type RightSectionProps = {
  project: Project | ProjectDraft;
  status?: ProjectStatus | "draft";
};

function RightSection(props: RightSectionProps) {
  const { project, status } = props;

  const navigate = useNavigate();

  const { data: user } = useAuthProfile();
  const { mutateAsync: acceptProject, isPending: isAccepting } =
    useUpdateProjectJammerStatus("accepted");
  const { mutateAsync: rejectProject, isPending: isRejecting } =
    useUpdateProjectJammerStatus("rejected");

  const handleAcceptProject = async () => {
    if (!user) return;

    await acceptProject({
      projectId: project.id,
      userId: user.id
    });

    // Redirect to edit page after accepting
    await navigate({ to: "/project/[id]/edit", params: { id: project.id } });
  };

  const handleRejectProject = async () => {
    if (!user) return;

    await rejectProject({
      projectId: project.id,
      userId: user.id
    });

    await navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex w-full shrink-0 flex-col items-start rounded-2xl bg-white px-4 py-8 sm:max-w-80 sm:px-6">
      <div className="space-y-7.5">
        <div
          className={
            user?.user_type === UserType.Jammer ? "space-y-5" : "space-y-7.5"
          }
        >
          {user?.user_type === UserType.Jammer && (
            <ProjectStatusTag status={status} />
          )}
          {user?.user_type === UserType.Client && (
            <Heading4>{project.product_name}</Heading4>
          )}
          <SectionDataBlock
            title="Link to your project"
            type="link-list"
            value={project.project_link?.map((item) => item.url) ?? []}
          />
        </div>
        {user?.user_type === UserType.Jammer && (
          <div className="space-y-4">
            {status === "awaiting_response" && (
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
                  className="h-14 border-gray-600-secondary text-gray-600-secondary"
                  startIcon={<LuXCircle className="mb-0.5 h-5 w-5" />}
                  onClick={handleRejectProject}
                  loading={isRejecting}
                  disabled={isAccepting || isRejecting}
                >
                  Decline this session
                </Button>
              </>
            )}
            {status === "accepted" && (
              <Link to="/project/[id]/edit" params={{ id: project.id }}>
                <Button className="h-14">Respond</Button>
              </Link>
            )}
          </div>
        )}
        <Divider className="border-dashed" />
        <div className="grid grid-cols-2 gap-3">
          <DataBlock title="Subject" value={project.product_name} />
          <DataBlock title="Product type" value={project.product_type ?? ""} />
          <DataBlock
            title="Date Created"
            value={dayjs(project.created_at).format("MMM D, YYYY")}
          />
          <DataBlock
            title="Review End"
            value={dayjs(project.created_at).format("MMM D, YYYY")}
          />
        </div>
        <SectionDataBlock
          title="Industry"
          type="chip"
          value={project.product_industry ?? []}
        />
        {user?.user_type === UserType.Client && (
          <>
            {status === "draft" ? (
              <Link
                to="/project/draft/$id/edit"
                params={{ id: project.id }}
                className="block"
              >
                <Button variant="outline" className="text-blue-secondary-dark">
                  Edit
                </Button>
              </Link>
            ) : (
              <Link
                to="/project/[id]/edit"
                params={{ id: project.id }}
                className="block"
              >
                <Button variant="outline" className="text-blue-secondary-dark">
                  Edit
                </Button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default RightSection;

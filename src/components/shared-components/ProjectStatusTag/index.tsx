import { getProjectStatusLabel } from "@/helpers/project";
import { ProjectStatus } from "@/types/project";
import { cn } from "@/utils";

type ProjectStatusTagProps = {
  status?: ProjectStatus | "draft";
  containerClassName?: string;
  className?: string;
};

function ProjectStatusTag(props: ProjectStatusTagProps) {
  const { status, className, containerClassName } = props;

  return (
    <div
      className={cn(
        "rounded-sm bg-functional-warning-100 px-2 py-1",
        {
          "bg-functional-success-100": status === "accepted",
          "bg-functional-link-100": status === "closed",
          "bg-gray-300": status === "draft",
          "bg-blue-secondary-dark": status === "design_implementation"
        },
        className
      )}
    >
      <p
        className={cn(
          "font-dm-sans text-sm font-semibold text-functional-warning-500",
          {
            "text-functional-success-500": status === "accepted",
            "text-functional-link-500": status === "closed",
            "text-gray-600-secondary": status === "draft",
            "text-functional-success-300": status === "design_implementation"
          },
          containerClassName
        )}
      >
        {getProjectStatusLabel(status)}
      </p>
    </div>
  );
}

export default ProjectStatusTag;

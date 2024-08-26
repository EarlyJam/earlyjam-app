import { useEffect, useState } from "react";

import ReviewDisplay from "@/components/page-components/JammerResponse/ReviewDisplay.tsx";
import ReviewForm from "@/components/page-components/JammerResponse/ReviewForm.tsx";
import useCreateProjectJammerReview from "@/hooks/mutations/useCreateProjectJammerReview.ts";
import useUpdateProjectJammerReview from "@/hooks/mutations/useUpdateProjectJammerReview.ts";
import useAuthUser from "@/hooks/queries/useAuthUser.ts";
import useProjectJammerReview from "@/hooks/queries/useProjectJammerReview.ts";

type ProjectJammerReviewProps = {
  projectId: string;
  jammerId: string;
};

function ProjectJammerReview(props: ProjectJammerReviewProps) {
  const { projectId, jammerId } = props;

  const { data: user } = useAuthUser();

  const { data: projectJammerReview, refetch } = useProjectJammerReview(
    projectId,
    jammerId,
    user?.id
  );
  const { mutateAsync: createProjectJammerReview } =
    useCreateProjectJammerReview();
  const { mutateAsync: updateProjectJammerReview } =
    useUpdateProjectJammerReview();

  const [viewMode, setViewMode] = useState<"edit" | "display">(
    projectJammerReview ? "display" : "edit"
  );

  useEffect(() => {
    if (!projectJammerReview) {
      setViewMode("edit");
    } else {
      setViewMode("display");
    }
  }, [projectJammerReview]);

  const handleReviewSubmit = async (data: {
    reviewType: "positive" | "negative";
    reviewSummary: string;
  }) => {
    if (projectJammerReview?.id) {
      await updateProjectJammerReview({
        id: projectJammerReview.id,
        data: {
          review_type: data.reviewType,
          summary: data.reviewSummary
        }
      });

      await refetch();
      setViewMode("display");
    } else if (user?.id) {
      await createProjectJammerReview({
        review_type: data.reviewType,
        jammer_id: jammerId,
        summary: data.reviewSummary,
        user_id: user.id,
        project_id: projectId
      });

      await refetch();
      setViewMode("display");
    }
  };

  const handleEdit = () => {
    setViewMode("edit");
  };

  if (viewMode === "edit") {
    return (
      <ReviewForm
        onSubmit={handleReviewSubmit}
        defaultValues={{
          reviewType: projectJammerReview?.review_type,
          reviewSummary: projectJammerReview?.summary
        }}
      />
    );
  }

  if (projectJammerReview) {
    return (
      <ReviewDisplay review={projectJammerReview} onEditClick={handleEdit} />
    );
  }

  return <></>;
}

export default ProjectJammerReview;

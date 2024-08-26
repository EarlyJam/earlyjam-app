import { useMutation } from "@tanstack/react-query";

import { createProjectJammerReview } from "@/helpers/db/jammerReview.ts";
import { JammerReview } from "@/types/jammerReview.ts";

export function getCreateProjectJammerReviewKey() {
  return ["useCreateProjectJammerReview"];
}

function useCreateProjectJammerReview() {
  return useMutation({
    mutationKey: getCreateProjectJammerReviewKey(),
    mutationFn: async (
      data: Pick<
        JammerReview,
        "review_type" | "jammer_id" | "summary" | "user_id" | "project_id"
      >
    ) => {
      return createProjectJammerReview(data);
    }
  });
}

export default useCreateProjectJammerReview;

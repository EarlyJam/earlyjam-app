import { useMutation } from "@tanstack/react-query";

import { updateProjectJammerReview } from "@/helpers/db/jammerReview.ts";
import { JammerReview } from "@/types/jammerReview.ts";

export function getUpdateProjectJammerReviewKey() {
  return ["useUpdateProjectJammerReview"];
}

function useUpdateProjectJammerReview() {
  return useMutation({
    mutationKey: getUpdateProjectJammerReviewKey(),
    mutationFn: async (data: {
      id: string;
      data: Partial<Pick<JammerReview, "review_type" | "summary">>;
    }) => {
      return updateProjectJammerReview(data.id, data.data);
    }
  });
}

export default useUpdateProjectJammerReview;

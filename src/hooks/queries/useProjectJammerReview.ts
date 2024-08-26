import { useQuery } from "@tanstack/react-query";

import { getProjectJammerReview } from "@/helpers/db/jammerReview.ts";

function useProjectJammerReview(
  projectId?: string,
  jammerId?: string,
  userId?: string
) {
  return useQuery({
    queryKey: ["projectJammerReview", projectId, jammerId, userId],
    queryFn: () => {
      return getProjectJammerReview(projectId!, jammerId!, userId!);
    },
    enabled: !!projectId && !!jammerId && !!userId
  });
}

export default useProjectJammerReview;

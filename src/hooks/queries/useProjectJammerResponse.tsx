import { useQuery } from "@tanstack/react-query";

import { getProjectJammerResponse } from "@/helpers/db/project";

function useProjectJammerResponse(projectId?: string, jammerId?: string) {
  return useQuery({
    queryKey: ["jammerProjectResponse", jammerId, projectId],
    queryFn: () => {
      return getProjectJammerResponse(projectId!, jammerId!);
    },
    enabled: !!jammerId && !!projectId
  });
}

export default useProjectJammerResponse;

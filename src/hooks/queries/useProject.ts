import { useQuery } from "@tanstack/react-query";

import { getProject } from "@/helpers/db/project";

function useProject(projectId?: string) {
  return useQuery({
    queryKey: ["profile", projectId],
    queryFn: async () => {
      if (!projectId) return;
      const profile = await getProject(projectId);

      return profile;
    },
    enabled: !!projectId,
  });
}

export default useProject;

import { useQuery } from "@tanstack/react-query";

import { getProjectJammer } from "@/helpers/db/project";

function useProjectJammer(jammerId?: string, projectId?: string) {
  return useQuery({
    queryKey: ["jammerProjects"],
    queryFn: () => {
      return getProjectJammer(jammerId!, projectId!);
    },
    enabled: !!jammerId && !!projectId
  });
}

export default useProjectJammer;

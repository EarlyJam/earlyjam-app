import { useQuery } from "@tanstack/react-query";

import { getProjectJammers } from "@/helpers/db/project";
import { ProjectJammer } from "@/types/project";

function useProjectJammers(
  projectId?: string,
  filters?: Partial<Pick<ProjectJammer, "status">>
) {
  return useQuery({
    queryKey: ["projectJammers"],
    queryFn: () => {
      return getProjectJammers(projectId!, filters);
    },
    enabled: !!projectId
  });
}

export default useProjectJammers;

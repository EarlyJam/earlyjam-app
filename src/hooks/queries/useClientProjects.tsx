import { useQuery } from "@tanstack/react-query";

import { getClientProjects } from "@/helpers/db/project";
import { ProjectJammer } from "@/types/project";

function useClientProjects(
  userId?: string,
  page = 0,
  size = 10,
  filters: Partial<Pick<ProjectJammer, "status">> = {}
) {
  return useQuery({
    queryKey: ["userProjects", userId, page, size, filters],
    queryFn: () => {
      return getClientProjects(userId!, page, size, filters);
    },
    enabled: !!userId
  });
}

export default useClientProjects;

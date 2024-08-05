import { getJammerProjects } from "@/helpers/db/project";
import { ProjectJammer } from "@/types/project";
import { useQuery } from "@tanstack/react-query";

function useJammerProjects(
  jammerId?: string,
  page = 0,
  size = 10,
  filters: Partial<Pick<ProjectJammer, "status">> = {},
) {
  return useQuery({
    queryKey: ["jammerProjects", jammerId, page, size, filters],
    queryFn: () => {
      return getJammerProjects(jammerId!, page, size, filters);
    },
    enabled: !!jammerId,
  });
}

export default useJammerProjects;

import { useQuery } from "@tanstack/react-query";

import { getUpsellRequests } from "@/helpers/db/upsellRequest.ts";

function useUpsellRequests(projectId?: string) {
  return useQuery({
    queryKey: ["upsellRequests", projectId],
    queryFn: () => {
      return getUpsellRequests(projectId!);
    },
    enabled: !!projectId
  });
}

export default useUpsellRequests;

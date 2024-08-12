import { useQuery } from "@tanstack/react-query";

import { listProjectDrafts } from "@/helpers/db/projectDraft";

function useProjectDrafts(userId: string, page = 0, size = 10) {
  return useQuery({
    queryKey: ["projectDrafts", userId, page, size],
    queryFn: () => listProjectDrafts(userId, page, size),
    enabled: !!userId
  });
}

export default useProjectDrafts;

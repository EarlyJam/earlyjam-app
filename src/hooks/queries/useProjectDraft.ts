import { useQuery } from "@tanstack/react-query";

import { getProjectDraft } from "@/helpers/db/projectDraft";

function useProjectDraft(draftId?: string) {
  return useQuery({
    queryKey: ["projectDraft", draftId],
    queryFn: async () => {
      if (!draftId) return;
      const profile = await getProjectDraft(draftId);

      return profile;
    },
    enabled: !!draftId
  });
}

export default useProjectDraft;

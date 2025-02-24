import { useQuery } from "@tanstack/react-query";

import { getMarkup } from "@/helpers/db/markup.ts";

function useMarkup(markupId?: string) {
  return useQuery({
    queryKey: ["markup", markupId],
    queryFn: () => {
      if (!markupId) return;
      return getMarkup(markupId);
    },
    enabled: !!markupId
  });
}

export default useMarkup;

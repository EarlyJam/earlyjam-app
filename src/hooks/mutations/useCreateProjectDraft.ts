import { useMutation } from "@tanstack/react-query";

import { createProjectDraft } from "@/helpers/db/projectDraft";
import { ProjectDraft } from "@/types/projectDraft";

function useCreateProjectDraft() {
  return useMutation({
    mutationKey: ["createProjectDraft"],
    mutationFn: async (draft: Partial<ProjectDraft>) => {
      return await createProjectDraft(draft);
    }
  });
}

export default useCreateProjectDraft;

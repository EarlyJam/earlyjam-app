import { useMutation } from "@tanstack/react-query";

import { deleteProjectDraft } from "@/helpers/db/projectDraft";

function useDeleteProjectDraft() {
  return useMutation({
    mutationKey: ["deleteProjectDraft"],
    mutationFn: async (id: string) => {
      await deleteProjectDraft(id);
    }
  });
}

export default useDeleteProjectDraft;

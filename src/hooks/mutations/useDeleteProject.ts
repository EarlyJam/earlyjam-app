import { useMutation } from "@tanstack/react-query";

import { deleteProject, deleteProjectJammers } from "@/helpers/db/project";

function useDeleteProject() {
  return useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: async (id: string) => {
      await deleteProject(id);
      await deleteProjectJammers(id);
    }
  });
}

export default useDeleteProject;

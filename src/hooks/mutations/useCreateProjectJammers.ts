import { useMutation } from "@tanstack/react-query";

import { createProjectJammers } from "@/helpers/db/project";

function useCreateProjectJammers() {
  return useMutation({
    mutationKey: ["createProjectJammers"],
    mutationFn: async (args: { projectId: string; userIds: string[] }) => {
      const { projectId, userIds } = args;
      await createProjectJammers(projectId, userIds);
    }
  });
}

export default useCreateProjectJammers;

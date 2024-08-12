import { useMutation } from "@tanstack/react-query";

import { updateProjectJammer } from "@/helpers/db/project";
import { updateProjectStatus } from "@/helpers/project";
import { ProjectStatus } from "@/types/project";

function useUpdateProjectJammerStatus(status: ProjectStatus) {
  return useMutation({
    mutationKey: ["useUpdateProjectJammerStatus", status],
    mutationFn: async (args: { projectId: string; userId: string }) => {
      const { projectId, userId } = args;
      await updateProjectJammer(projectId, userId, { status });
      await updateProjectStatus(projectId);
    }
  });
}

export default useUpdateProjectJammerStatus;

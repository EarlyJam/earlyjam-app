import { updateProjectJammer } from "@/helpers/db/project";
import { ProjectJammer } from "@/types/project";
import { useMutation } from "@tanstack/react-query";

function useUpdateProjectJammerStatus(status: ProjectJammer["status"]) {
  return useMutation({
    mutationKey: ["useUpdateProjectJammerStatus", status],
    mutationFn: async (args: { projectId: string; userId: string }) => {
      const { projectId, userId } = args;
      await updateProjectJammer(projectId, userId, { status });
    },
  });
}

export default useUpdateProjectJammerStatus;

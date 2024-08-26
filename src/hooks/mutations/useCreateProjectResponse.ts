import { useMutation } from "@tanstack/react-query";

import { createProjectResponse } from "@/helpers/db/project";
import { ProjectResponse } from "@/types/project";

function useCreateProjectResponse() {
  return useMutation({
    mutationKey: ["useCreateProjectResponse"],
    mutationFn: (args: {
      projectId: string;
      jammerId: string;
      data: Pick<
        ProjectResponse,
        "summary" | "additional_links" | "loom_video_id"
      >;
    }) => {
      const { projectId, jammerId, data } = args;
      return createProjectResponse(projectId, jammerId, data);
    }
  });
}

export default useCreateProjectResponse;

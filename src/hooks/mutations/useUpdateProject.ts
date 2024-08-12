import { useMutation } from "@tanstack/react-query";

import { updateProject } from "@/helpers/db/project";
import { Project } from "@/types/project";

function useUpdateProject() {
  return useMutation({
    mutationKey: ["updateProject"],
    mutationFn: async (args: {
      id: string;
      data: Partial<Omit<Project, "id" | "created_at" | "updated_at">>;
    }) => {
      const { id, data } = args;
      return await updateProject(id, data);
    }
  });
}

export default useUpdateProject;

import { useMutation } from "@tanstack/react-query";

import { createProjectPayment } from "@/helpers/db/projectPayment.ts";

function useCreateProjectPayment() {
  return useMutation({
    mutationKey: ["createProjectPayment"],
    mutationFn: async (...args: Parameters<typeof createProjectPayment>) => {
      return await createProjectPayment(...args);
    }
  });
}

export default useCreateProjectPayment;

import { useMutation } from "@tanstack/react-query";

import { updateProjectPayment } from "@/helpers/db/projectPayment.ts";

function useCreateProjectPayment() {
  return useMutation({
    mutationKey: ["updateProjectPayment"],
    mutationFn: async (...args: Parameters<typeof updateProjectPayment>) => {
      return await updateProjectPayment(...args);
    }
  });
}

export default useCreateProjectPayment;

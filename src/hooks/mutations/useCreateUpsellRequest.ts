import { useMutation } from "@tanstack/react-query";

import { createUpsellRequest } from "@/helpers/db/upsellRequest.ts";
import { UpsellRequest } from "@/types/upsellRequest.ts";

function useCreateUpsellRequest() {
  return useMutation({
    mutationKey: ["createUpsellRequest"],
    mutationFn: async (data: Partial<UpsellRequest>) => {
      return await createUpsellRequest(data);
    }
  });
}

export default useCreateUpsellRequest;

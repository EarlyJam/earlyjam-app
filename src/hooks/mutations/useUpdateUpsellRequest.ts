import { useMutation } from "@tanstack/react-query";

import { updateUpsellRequest } from "@/helpers/db/upsellRequest.ts";
import { UpsellRequest } from "@/types/upsellRequest.ts";

function useUpdateUpsellRequest() {
  return useMutation({
    mutationKey: ["updateUpsellRequest"],
    mutationFn: async (data: { id: number; data: Partial<UpsellRequest> }) => {
      return await updateUpsellRequest(data.id, data.data);
    }
  });
}

export default useUpdateUpsellRequest;

import { useMutation } from "@tanstack/react-query";

import { createCheckoutSession } from "@/helpers/stripe.ts";

function useCreateCheckoutSession() {
  return useMutation({
    mutationKey: ["create-checkout-session"],
    mutationFn: async (params: {
      projectId: string;
      checkoutId: string;
      type: "upsell" | "brief";
    }) => {
      const { projectId, checkoutId, type } = params;
      return await createCheckoutSession(type, projectId, checkoutId);
    }
  });
}

export default useCreateCheckoutSession;

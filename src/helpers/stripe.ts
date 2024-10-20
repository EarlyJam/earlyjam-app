import { callEdgeFunction } from "@/helpers/edgeFunction.ts";

export async function createCheckoutSession(
  type: "upsell" | "brief",
  projectId: string,
  checkoutId: string
) {
  let successUrl = `${window.location.origin}/project/${projectId}/payment-complete?paymentId=${checkoutId}`;

  if (type === "upsell") {
    successUrl = `${window.location.origin}/project/${projectId}/upsell-payment-complete?paymentId=${checkoutId}`;
  }

  const { url } = await callEdgeFunction("createCheckoutSession", {
    body: {
      type,
      successUrl
    }
  });

  return url;
}

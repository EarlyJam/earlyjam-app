import { FunctionInvokeOptions } from "@supabase/supabase-js";

import { EDGE_FUNCTIONS } from "@/constants/supabase/functions.ts";
import client from "@/helpers/client.ts";
import { EDGE_FUNCTIONS_RESPONSES } from "@/types/edgeFunction.ts";

export const callEdgeFunction = async <
  FunctionName extends keyof typeof EDGE_FUNCTIONS
>(
  functionName: FunctionName,
  options?: FunctionInvokeOptions
) => {
  const response = await client.functions.invoke<
    EDGE_FUNCTIONS_RESPONSES[typeof functionName]
  >(EDGE_FUNCTIONS[functionName], options);

  if (response.error as Error | null) {
    throw response.error;
  }

  if (!response.data) {
    throw new Error("No data returned");
  }

  return response.data;
};

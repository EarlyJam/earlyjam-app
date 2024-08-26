import { FunctionInvokeOptions } from "@supabase/supabase-js";

import { EDGE_FUNCTIONS } from "@/constants/supabase/functions.ts";
import client from "@/helpers/client.ts";

export const callEdgeFunction = async (
  functionName: keyof typeof EDGE_FUNCTIONS,
  options?: FunctionInvokeOptions
) => {
  const response = await client.functions.invoke<{ jws: string }>(
    EDGE_FUNCTIONS[functionName],
    options
  );

  if (response.error as Error | null) {
    throw response.error;
  }

  if (!response.data) {
    throw new Error("No data returned");
  }

  return response.data;
};

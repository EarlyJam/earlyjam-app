import { useQuery } from "@tanstack/react-query";

import { getWalletTransactions } from "@/helpers/db/walletTransaction.ts";

function useWalletTransactions(
  ...params: Parameters<typeof getWalletTransactions>
) {
  return useQuery({
    queryKey: ["useWalletTransactions", ...params],
    queryFn: async () => {
      return getWalletTransactions(...params);
    }
  });
}

export default useWalletTransactions;

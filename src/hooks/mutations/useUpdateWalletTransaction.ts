import { useMutation } from "@tanstack/react-query";

import { updateWalletTransaction } from "@/helpers/db/walletTransaction.ts";
import { WalletTransaction } from "@/types/userWallet.ts";

function useUpdateWalletTransaction() {
  return useMutation({
    mutationKey: ["updateWalletTransaction"],
    mutationFn: async (params: {
      id: number;
      data: Partial<WalletTransaction>;
    }) => {
      return updateWalletTransaction(params.id, params.data);
    }
  });
}

export default useUpdateWalletTransaction;

import { useMutation } from "@tanstack/react-query";

import { createWalletTransaction } from "@/helpers/db/walletTransaction.ts";
import { WalletTransaction } from "@/types/userWallet.ts";

function useCreateWalletTransaction() {
  return useMutation({
    mutationKey: ["createWalletTransaction"],
    mutationFn: async (data: Partial<WalletTransaction>) => {
      return createWalletTransaction(data);
    }
  });
}

export default useCreateWalletTransaction;

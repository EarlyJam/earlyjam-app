import { useMutation } from "@tanstack/react-query";

import { updateUserWallet } from "@/helpers/db/userWallet.ts";
import useAuthProfile from "@/hooks/queries/useAuthProfile.ts";
import { UserWallet } from "@/types/userWallet.ts";

function useUpdateUserWallet() {
  const { data: profile } = useAuthProfile();

  return useMutation({
    mutationKey: ["updateUserWallet"],
    mutationFn: async (params: { data: Partial<UserWallet> }) => {
      if (!profile) throw new Error("Profile not found");

      return updateUserWallet(profile.id, params.data);
    }
  });
}

export default useUpdateUserWallet;

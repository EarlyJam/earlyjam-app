import { useQuery } from "@tanstack/react-query";

import { getUserWallet } from "@/helpers/db/userWallet.ts";
import useAuthUser from "@/hooks/queries/useAuthUser.ts";

function useUserWallet() {
  const { data: user } = useAuthUser();

  return useQuery({
    queryKey: ["userWallet", user?.id],
    queryFn: () => getUserWallet(user!.id),
    enabled: !!user?.id
  });
}

export default useUserWallet;

import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/helpers/db/profile";
import useAuthUser from "@/hooks/queries/useAuthUser";

function useAuthProfile() {
  const { data: user } = useAuthUser();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return;
      return await getProfile(user.id);
    },
    enabled: !!user?.id
  });
}

export default useAuthProfile;

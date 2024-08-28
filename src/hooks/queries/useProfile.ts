import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/helpers/db/profile.ts";

function useProfile(id?: string) {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => {
      return getProfile(id!);
    },
    enabled: !!id
  });
}

export default useProfile;

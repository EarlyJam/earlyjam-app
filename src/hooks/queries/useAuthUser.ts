import { useQuery } from "@tanstack/react-query";

import { getAuthUser } from "@/helpers/auth";

function useAuthUser() {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => {
      return getAuthUser();
    }
  });
}

export default useAuthUser;

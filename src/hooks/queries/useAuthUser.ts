import { getAuthUser } from "@/helpers/auth";
import { useQuery } from "@tanstack/react-query";

function useAuthUser() {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const user = await getAuthUser();

      return user;
    },
  });
}

export default useAuthUser;

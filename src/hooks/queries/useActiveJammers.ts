import { useQuery } from "@tanstack/react-query";

import { listActiveJammers } from "@/helpers/db/profile";

function useActiveJammers() {
  return useQuery({
    queryKey: ["useActiveJammers"],
    queryFn: async () => {
      return listActiveJammers();
    }
  });
}

export default useActiveJammers;

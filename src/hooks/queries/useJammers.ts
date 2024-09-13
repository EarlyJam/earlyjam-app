import { useQuery } from "@tanstack/react-query";

import { listJammers } from "@/helpers/db/profile";

function useJammers(ids?: string[]) {
  return useQuery({
    queryKey: ["jammers"],
    queryFn: async () => {
      return listJammers(ids);
    }
  });
}

export default useJammers;

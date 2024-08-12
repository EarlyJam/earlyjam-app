import { useQuery } from "@tanstack/react-query";

import { listJammers } from "@/helpers/db/profile";

function useJammers() {
  return useQuery({
    queryKey: ["jammers"],
    queryFn: async () => {
      const data = await listJammers();
      return data;
    }
  });
}

export default useJammers;

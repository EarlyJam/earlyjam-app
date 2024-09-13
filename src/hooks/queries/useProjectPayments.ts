import { useQuery } from "@tanstack/react-query";

import { listProjectPayments } from "@/helpers/db/projectPayment.ts";

function useProjectPayments() {
  return useQuery({
    queryKey: ["useProjectPayments"],
    queryFn: async () => {
      return listProjectPayments();
    }
  });
}

export default useProjectPayments;

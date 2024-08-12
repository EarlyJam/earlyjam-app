import { useMutation } from "@tanstack/react-query";

import { updateProfile } from "@/helpers/db/profile";
import { Profile } from "@/types/profile";

function useUpdateProfile() {
  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (args: {
      id: string;
      data: Partial<Omit<Profile, "id">>;
    }) => {
      const { id, data } = args;
      return await updateProfile(id, data);
    }
  });
}

export default useUpdateProfile;

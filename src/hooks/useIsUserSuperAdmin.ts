import { UserType } from "@/enums/user.ts";
import useAuthUser from "@/hooks/queries/useAuthUser.ts";

function useIsUserSuperAdmin() {
  const { data: user } = useAuthUser();

  if (!user) return "undetermined";

  return user.user_metadata.user_type === UserType.SuperAdmin;
}

export default useIsUserSuperAdmin;

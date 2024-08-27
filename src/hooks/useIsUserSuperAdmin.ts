import useAuthUser from "@/hooks/queries/useAuthUser.ts";

function useIsUserSuperAdmin() {
  const { data: user } = useAuthUser();

  if (!user) return "undetermined";

  return user.user_metadata.user_type === "super_admin";
}

export default useIsUserSuperAdmin;

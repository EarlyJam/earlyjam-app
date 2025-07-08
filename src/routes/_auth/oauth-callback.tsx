import { useEffect, useRef } from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LuLoader2 } from "react-icons/lu";

import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import { UserType } from "@/enums/user";
import { getAuthUser } from "@/helpers/auth";
import { updateProfile } from "@/helpers/db/profile";

export const Route = createFileRoute("/_auth/oauth-callback")({
  validateSearch(input) {
    const { type, state } = input;
    const localState = localStorage.getItem(LOCAL_STORAGE_KEYS.oauthState);

    if (localState !== state) {
      throw new Error("Invalid state");
    }

    if (type !== "client" && type !== "jammer") {
      throw new Error("Invalid type");
    }

    return { type: type as UserType, state };
  },
  component: OAuthCallback
});

function OAuthCallback() {
  const search = Route.useSearch();

  const navigate = useNavigate();

  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.oauthState);

      const user = await getAuthUser();
      if (!user) return;

      const userMetadata = {
        first_name: user.user_metadata.first_name as string | undefined,
        last_name: user.user_metadata.last_name as string | undefined,
        name: user.user_metadata.name as string | undefined,
        full_name: user.user_metadata.full_name as string | undefined,
        picture: user.user_metadata.picture as string | undefined,
        avatar_url: user.user_metadata.avatar_url as string | undefined
      };

      const firstName =
        userMetadata.first_name ??
        userMetadata.name?.split(" ")[0] ??
        userMetadata.full_name?.split(" ")[0];

      const lastName =
        userMetadata.last_name ??
        userMetadata.name?.split(" ")[1] ??
        userMetadata.full_name?.split(" ")[1];

      const profileImage = userMetadata.picture ?? userMetadata.avatar_url;

      await updateProfile(user.id, {
        first_name: firstName,
        last_name: lastName,
        user_type: search.type,
        profile_image: profileImage
      });

      await navigate({
        to: search.type === UserType.Client ? "/" : "/onboarding"
      });
      done.current = true;
    })();
  }, [search]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LuLoader2 className="h-16 w-16 animate-spin" />
    </div>
  );
}

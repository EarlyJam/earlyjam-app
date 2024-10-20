import { ReactNode, useEffect, useRef, useState } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { getAuthUser } from "@/helpers/auth.ts";
import { getProfile } from "@/helpers/db/profile.ts";
import { RouterContext } from "@/types/router.ts";

type ProviderData = {
  routerContext: RouterContext;
};

type ProviderProps = {
  children(data: ProviderData): ReactNode;
};

function Providers(props: ProviderProps) {
  const { children } = props;

  const [routerContext, setRouterContext] = useState<RouterContext>({
    authUser: undefined,
    authProfile: undefined,
    contextInitiated: false
  });
  const dataFetchDone = useRef(false);

  useEffect(() => {
    if (!dataFetchDone.current) {
      dataFetchDone.current = true;
      void (async () => {
        const authUser = await getAuthUser();
        if (authUser?.id) {
          const authProfile = await getProfile(authUser.id);

          setRouterContext({
            authUser,
            authProfile,
            contextInitiated: true
          });

          return;
        }

        setRouterContext({
          authUser: undefined,
          authProfile: undefined,
          contextInitiated: true
        });
      })();
    }
  }, []);

  return <TooltipProvider>{children({ routerContext })}</TooltipProvider>;
}

export default Providers;

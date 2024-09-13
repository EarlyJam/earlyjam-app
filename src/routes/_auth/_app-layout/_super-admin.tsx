import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { UserType } from "@/enums/user.ts";

export const Route = createFileRoute("/_auth/_app-layout/_super-admin")({
  beforeLoad({ context }) {
    if (context.authProfile?.user_type !== UserType.SuperAdmin) {
      return redirect({
        to: "/"
      });
    }
  },
  component: () => <Outlet />
});

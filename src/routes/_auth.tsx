import { isAuthenticated } from "@/helpers/auth";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  async beforeLoad({ location }) {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },

  component: () => <Outlet />,
});

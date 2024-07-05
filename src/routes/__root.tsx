import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-beige-secondary h-screen w-screen overflow-auto">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});

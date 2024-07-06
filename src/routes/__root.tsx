import { Toaster } from "@/components/ui/toaster";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-beige-secondary h-screen w-screen overflow-auto">
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </div>
  ),
});

import { Toaster } from "@/components/ui/toaster";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

export const Route = createRootRoute({
  component: () => (
    <div className="bg-beige-secondary h-screen w-screen overflow-auto">
      <Outlet />
      <Toaster />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  ),
});

import { lazy, Suspense } from "react";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { Toaster } from "@/components/ui/toaster";
import { RouterContext } from "@/types/router.ts";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="h-screen w-screen overflow-auto bg-beige-secondary">
      <Outlet />
      <Toaster />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  )
});

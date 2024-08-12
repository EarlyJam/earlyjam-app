import { lazy, Suspense } from "react";

import { createRootRoute, Outlet } from "@tanstack/react-router";

import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/util-components/Providers";

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

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen w-screen overflow-auto bg-beige-secondary">
      <Providers>
        <Outlet />
      </Providers>
      <Toaster />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  )
});

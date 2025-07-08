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
      {/* Add a placeholder for the root route */}
      {/* Only render if location.pathname === '/' */}
      {window.location.pathname === '/' && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold">Welcome to EarlyJam</h1>
          <p className="text-lg mt-4">This is the marketing site placeholder. Update this with your real marketing content.</p>
        </div>
      )}
    </div>
  )
});

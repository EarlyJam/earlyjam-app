import { createFileRoute, Outlet } from "@tanstack/react-router";

import Header from "@/components/layout-components/SimpleLayout/Header";

export const Route = createFileRoute("/_auth/_simple-layout")({
  component: SimpleLayout
});

function SimpleLayout() {
  return (
    <div className="mt-header h-content-with-header overflow-auto">
      <Header />
      <Outlet />
    </div>
  );
}

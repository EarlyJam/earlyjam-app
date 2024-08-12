import { createFileRoute, Outlet } from "@tanstack/react-router";

import AppHeader from "@/components/layout-components/AppHeader";
import AppHeaderSpacing from "@/components/layout-components/AppHeader/AppHeaderSpacing";
import SideNavigation from "@/components/layout-components/SideNavigation";
import SideNavSpacing from "@/components/layout-components/SideNavigation/SideNavSpacing";

export const Route = createFileRoute("/_auth/_app-layout")({
  component: AppLayout
});

function AppLayout() {
  return (
    <>
      <AppHeader />
      <SideNavigation />
      <div className="flex h-full w-full flex-row">
        <SideNavSpacing className="hidden sm:block" />
        <div className="flex w-full grow flex-col overflow-x-hidden bg-gray-100 sm:w-auto">
          <AppHeaderSpacing />
          <Outlet />
        </div>
      </div>
    </>
  );
}

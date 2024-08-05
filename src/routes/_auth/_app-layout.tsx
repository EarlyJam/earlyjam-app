import AppHeader from "@/components/layout-components/AppHeader";
import AppHeaderSpacing from "@/components/layout-components/AppHeader/AppHeaderSpacing";
import SideNavigation from "@/components/layout-components/SideNavigation";
import SideNavSpacing from "@/components/layout-components/SideNavigation/SideNavSpacing";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_app-layout")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <AppHeader />
      <SideNavigation />
      <div className="flex flex-row w-full h-full">
        <SideNavSpacing className="hidden sm:block" />
        <div className="grow bg-gray-100 w-full sm:w-auto overflow-x-hidden flex flex-col">
          <AppHeaderSpacing />
          <Outlet />
        </div>
      </div>
    </>
  );
}

import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_app-layout")({
  component: AppLayout
});

function AppLayout() {
  return (
    <div className="flex h-full w-full flex-row">
      <div className="flex w-full grow flex-col overflow-x-hidden bg-gray-100 sm:w-auto">
        <Outlet />
      </div>
    </div>
  );
}

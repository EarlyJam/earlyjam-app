import { createFileRoute, Outlet } from "@tanstack/react-router";

import Header from "@/components/page-components/Onboarding/Header";

export const Route = createFileRoute("/_auth/_onboarding")({
  component: OnboardingLayout
});

function OnboardingLayout() {
  return (
    <div>
      <Header />
      <div className="mt-header h-content-with-header">
        <Outlet />
      </div>
    </div>
  );
}

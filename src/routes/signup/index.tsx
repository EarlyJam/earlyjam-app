import { createFileRoute, redirect } from "@tanstack/react-router";

import Header from "@/components/page-components/Signup/Header";
import OnboardingSelection from "@/components/page-components/Signup/OnboardingSelection";
import { isAuthenticated } from "@/helpers/auth";

export const Route = createFileRoute("/signup/")({
  async beforeLoad() {
    const authenticated = await isAuthenticated();

    if (authenticated) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/"
      });
    }
  },
  component: Signup
});

function Signup() {
  return (
    <div>
      <Header />
      <OnboardingSelection />
    </div>
  );
}

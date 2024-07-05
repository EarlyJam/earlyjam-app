import Header from "@/components/page-components/Signup/Header";
import OnboardingSelection from "@/components/page-components/Signup/OnboardingSelection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  component: Signup,
});

function Signup() {
  return (
    <div>
      <Header />
      <OnboardingSelection />
    </div>
  );
}

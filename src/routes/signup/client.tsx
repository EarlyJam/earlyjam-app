import { createFileRoute } from "@tanstack/react-router";

import SignupFlow from "@/components/page-components/Signup/SignupFlow";

export const Route = createFileRoute("/signup/client")({
  component: ClientSignup
});

function ClientSignup() {
  return <SignupFlow />;
}

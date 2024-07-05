import SignupFlow from "@/components/page-components/Signup/SignupFlow";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/client")({
  component: ClientSignup,
});

function ClientSignup() {
  return <SignupFlow />;
}

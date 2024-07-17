import SignupFlow from "@/components/page-components/Signup/SignupFlow";
import { UserType } from "@/enums/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/jammer")({
  component: JammerSignup,
});

function JammerSignup() {
  return <SignupFlow type={UserType.Jammer} />;
}

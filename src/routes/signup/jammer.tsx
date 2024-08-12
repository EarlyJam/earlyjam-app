import { createFileRoute } from "@tanstack/react-router";

import SignupFlow from "@/components/page-components/Signup/SignupFlow";
import { UserType } from "@/enums/user";

export const Route = createFileRoute("/signup/jammer")({
  component: JammerSignup
});

function JammerSignup() {
  return <SignupFlow type={UserType.Jammer} />;
}

import { useState } from "react";

import Signup from "@/components/page-components/Signup/Signup";
import VerifyEmailModal from "@/components/page-components/Signup/VerifyEmailModal";
import { UserType } from "@/enums/user";

type SignupFlowProps = {
  type?: UserType;
};

function SignupFlow(props: SignupFlowProps) {
  const { type = UserType.Client } = props;

  const [showVerifyEmailModal, setShowVerifyEmailModal] = useState("");

  return showVerifyEmailModal ? (
    <VerifyEmailModal email={showVerifyEmailModal} />
  ) : (
    <Signup type={type} onDone={setShowVerifyEmailModal} />
  );
}

export default SignupFlow;

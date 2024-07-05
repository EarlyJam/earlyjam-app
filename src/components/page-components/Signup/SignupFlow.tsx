import Signup from "@/components/page-components/Signup/Signup";
import VerifyEmailModal from "@/components/page-components/Signup/VerifyEmailModal";
import { FC, useState } from "react";

const SignupFlow: FC = () => {
  const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false);

  return showVerifyEmailModal ? (
    <VerifyEmailModal />
  ) : (
    <Signup onDone={() => setShowVerifyEmailModal(true)} />
  );
};

export default SignupFlow;

import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

import Signup from "@/components/page-components/Signup/Signup";
import { UserType } from "@/enums/user";

type SignupFlowProps = {
  type?: UserType;
};

function SignupSuccessLoading() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      void navigate({ to: "/" });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white">
      <img src="/assets/images/onboarding_selection_client.png" alt="Success" className="w-24 h-24 mb-8" />
      <h2 className="text-3xl font-fraunces font-normal text-center text-black">Congratulations, your account has been created. Let&apos;s get you started!</h2>
    </div>
  );
}

function SignupFlow(props: SignupFlowProps) {
  const { type = UserType.Client } = props;
  const [showLoading, setShowLoading] = useState(false);

  const handleDone = () => {
    setShowLoading(true);
  };

  if (showLoading) return <SignupSuccessLoading />;
  return <Signup type={type} onDone={handleDone} />;
}

export default SignupFlow;

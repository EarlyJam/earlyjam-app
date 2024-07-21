import JammerInfoForm from "@/components/page-components/JammerOboarding/JammerInfoForm";
import RequestSubmitted from "@/components/page-components/JammerOboarding/RequestSubmitted";
import TipsBox from "@/components/page-components/JammerOboarding/TipsBox";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/_onboarding/onboarding/jammer")({
  component: JammerOnboarding,
});

function JammerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  return (
    <div className="w-full py-10 px-5 flex flex-col sm:flex-row justify-center items-start gap-8">
      {requestSubmitted ? (
        <RequestSubmitted />
      ) : (
        <>
          <JammerInfoForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onSubmitDone={() => setRequestSubmitted(true)}
          />
          <TipsBox currentStep={currentStep} />
        </>
      )}
    </div>
  );
}

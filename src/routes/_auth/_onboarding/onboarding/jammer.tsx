import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import JammerInfoForm from "@/components/page-components/JammerOboarding/JammerInfoForm";
import RequestSubmitted from "@/components/page-components/JammerOboarding/RequestSubmitted";
import TipsBox from "@/components/page-components/JammerOboarding/TipsBox";

export const Route = createFileRoute("/_auth/_onboarding/onboarding/jammer")({
  component: JammerOnboarding
});

function JammerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  return (
    <div className="flex w-full flex-col items-start justify-center gap-8 px-5 py-10 sm:flex-row">
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

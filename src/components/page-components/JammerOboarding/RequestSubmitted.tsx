import { useNavigate } from "@tanstack/react-router";

import Button from "@/components/shared-components/Button";
import { Card, CardContent } from "@/components/ui/card";

function RequestSubmitted() {
  const navigate = useNavigate();

  return (
    <div className="flex grow items-center justify-center">
      <Card className="w-full max-w-[592px] rounded-2xl border-none shadow-none">
        <CardContent className="space-y-8 px-8 py-10 text-center">
          <img
            className="mx-auto"
            src="/assets/images/jammer_submission_received.png"
            alt="success"
            loading="lazy"
          />
          <div className="space-y-3">
            <h2 className="font-fraunces text-2.5xl font-normal leading-11 text-blue-secondary-dark sm:text-4xl">
              Your submission has been received
            </h2>
            <p className="text-sm leading-5 text-gray-700">
              Become a part of our network of world-class experts
            </p>
            <p className="text-sm leading-5 text-gray-700">
              We wil review your work and email you very soon
            </p>
          </div>
          <Button
            className="mx-auto w-full sm:w-[360px]"
            onClick={() => {
              void navigate({ to: "/" });
            }}
          >
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default RequestSubmitted;

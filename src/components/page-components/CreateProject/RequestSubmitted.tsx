import { useEffect } from "react";

import { useNavigate } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";

type RequestSubmittedProps = {
  projectId: string;
};

function RequestSubmitted(props: RequestSubmittedProps) {
  const { projectId } = props;

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
      await navigate({
        to: "/project/[id]/jammer-selection",
        params: { id: projectId }
      });
    }, 5000);
  }, []);

  return (
    <div className="flex grow items-center justify-center">
      <Card className="w-full max-w-[592px] rounded-2xl border-none shadow-none">
        <CardContent className="space-y-8 px-8 py-10 text-center">
          <img
            className="mx-auto"
            src="/assets/images/request_submitted.png"
            alt="success"
            loading="lazy"
          />
          <div className="space-y-3">
            <h2 className="font-fraunces text-2.5xl font-normal leading-11 text-blue-secondary-dark sm:text-4xl">
              Request submitted
            </h2>
            <p className="text-sm leading-5.5 text-gray-700 sm:text-base">
              We find that at least two Jammers gives the best feedback and
              results
            </p>
          </div>
          <p className="font-semibold leading-5.5 text-blue-primary-500">
            Your recommended Jammers list will be ready in 5...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default RequestSubmitted;

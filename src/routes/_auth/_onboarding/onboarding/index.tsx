import { useEffect } from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_auth/_onboarding/onboarding/")({
  component: Onboarding
});

function Onboarding() {
  const navigate = useNavigate({ from: "/onboarding" });

  useEffect(() => {
    setTimeout(async () => {
      await navigate({ to: "jammer" });
    }, 5000);
  }, []);
  return (
    <div className="flex h-full grow items-center justify-center">
      <Card className="m-4 w-full max-w-[1024px] rounded-2xl border-none shadow-none">
        <CardContent className="space-y-8 px-8 py-10 text-center">
          <div className="space-y-4 py-10">
            <img
              className="mx-auto"
              src="/assets/images/email_verified.png"
              alt="success"
              loading="lazy"
            />
            <div className="mx-auto max-w-96 space-y-10 font-fraunces text-4xl font-normal leading-11 text-blue-secondary-dark">
              <h2>Congratulations! Your account is verified.</h2>
              <h2>Directing you now...</h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

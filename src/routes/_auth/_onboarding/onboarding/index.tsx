import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/_onboarding/onboarding/")({
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate({ from: "/onboarding" });

  useEffect(() => {
    setTimeout(async () => {
      await navigate({ to: "jammer" });
    }, 5000);
  }, []);
  return (
    <div className="grow flex justify-center items-center h-full">
      <Card className="w-full max-w-[1024px] m-4 shadow-none rounded-2xl border-none">
        <CardContent className="px-8 py-10 text-center space-y-8">
          <div className="py-10 space-y-4">
            <img
              className="mx-auto"
              src="/assets/images/email_verified.png"
              alt="success"
            />
            <div className="max-w-96 mx-auto space-y-10 font-fraunces text-4xl font-normal leading-11 text-blue-secondary-dark">
              <h2>Congratulations! Your account is verified.</h2>
              <h2>Directing you now...</h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

function RequestSubmitted() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(async () => {
      await navigate({ to: "/" });
    }, 5000);
  }, []);

  return (
    <div className="grow flex justify-center items-center">
      <Card className="w-full max-w-[592px] shadow-none rounded-2xl border-none">
        <CardContent className="px-8 py-10 text-center space-y-8">
          <img
            className="mx-auto"
            src="/assets/images/request_submitted.png"
            alt="success"
            loading="lazy"
          />
          <div className="space-y-3">
            <h2 className="font-fraunces text-blue-secondary-dark text-2.5xl sm:text-4xl font-normal leading-11">
              Request submitted
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-5.5">
              We find that at least two Jammers gives the best feedback and
              results
            </p>
          </div>
          <p className="text-blue-primary-500 font-semibold leading-5.5">
            Your recommended Jammers list will be ready in 5...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default RequestSubmitted;

import Button from "@/components/shared-components/Button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";

function RequestSubmitted() {
  const navigate = useNavigate();

  return (
    <div className="grow flex justify-center items-center">
      <Card className="w-full max-w-[592px] shadow-none rounded-2xl border-none">
        <CardContent className="px-8 py-10 text-center space-y-8">
          <img
            className="mx-auto"
            src="/assets/images/jammer_submission_received.png"
            alt="success"
          />
          <div className="space-y-3">
            <h2 className="font-fraunces text-blue-secondary-dark text-2.5xl sm:text-4xl font-normal leading-11">
              Your submission has been received
            </h2>
            <p className="text-gray-700 text-sm leading-5">
              Become a part of our network of world-class experts
            </p>
            <p className="text-gray-700 text-sm leading-5">
              We wil review your work and email you very soon
            </p>
          </div>
          <Button
            className="w-full mx-auto sm:w-[360px]"
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

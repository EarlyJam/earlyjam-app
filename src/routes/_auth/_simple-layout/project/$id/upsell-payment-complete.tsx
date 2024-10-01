import { useEffect } from "react";

import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import CheckCircleOutline from "@/assets/svgs/CheckCircleOutline.tsx";
import LogoFull from "@/assets/svgs/LogoFull.tsx";
import Button from "@/components/shared-components/Button";
import { Card } from "@/components/ui/card.tsx";
import Heading2 from "@/components/ui/heading2.tsx";
import useUpdateProject from "@/hooks/mutations/useUpdateProject.ts";
import useUpdateUpsellRequest from "@/hooks/mutations/useUpdateUpsellRequest.ts";

const searchSchema = z.object({
  paymentId: z.number().optional()
});

export const Route = createFileRoute(
  "/_auth/_simple-layout/project/$id/upsell-payment-complete"
)({
  validateSearch: searchSchema,
  component: UpsellPaymentComplete
});

function UpsellPaymentComplete() {
  const { paymentId } = Route.useSearch();
  const { id: projectId } = Route.useParams();

  const { mutateAsync: updateUpsellRequest } = useUpdateUpsellRequest();
  const { mutateAsync: updateProject } = useUpdateProject();

  useEffect(() => {
    if (paymentId) {
      void (async () => {
        await updateUpsellRequest({
          id: paymentId,
          data: { status: "in_progress" }
        });
        await updateProject({
          id: projectId,
          data: { status: "design_implementation" }
        });
      })();
    }
  }, []);

  return (
    <div className="mt-10 flex flex-row justify-center pb-10">
      <Card className="flex max-w-256 grow flex-col items-center justify-center gap-6 p-10">
        <CheckCircleOutline />
        <Heading2 className="w-full text-center">
          Your request has been sent!
        </Heading2>
        <div className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-blue-secondary-dark">
          <LogoFull variant="light" className="w-3/4" />
        </div>
        <div className="space-y-3 text-center">
          <p className="text-lg font-semibold leading-6 text-blue-secondary-dark">
            What’s next?
          </p>
          <p className="text-sm text-blue-secondary-dark">
            1. You&apos;ll be contacted by our team via your email
            “justin@earlyjam.com”
          </p>
          <p className="text-sm text-blue-secondary-dark">
            2. Book a call and discuss the project detail
          </p>
          <p className="text-sm text-blue-secondary-dark">
            3. Kickoff your project
          </p>
        </div>
        <Link to="/">
          <Button className="max-w-80">Go to Home</Button>
        </Link>
      </Card>
    </div>
  );
}

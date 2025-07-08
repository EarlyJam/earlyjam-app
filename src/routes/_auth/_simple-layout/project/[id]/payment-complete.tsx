import { useEffect } from "react";

import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import BriefSent from "@/assets/svgs/BriefSent.tsx";
import Button from "@/components/shared-components/Button";
import { Card } from "@/components/ui/card.tsx";
import Heading2 from "@/components/ui/heading2.tsx";
import useUpdateProjectPayment from "@/hooks/mutations/useUpdateProjectPayment.ts";

const searchSchema = z.object({
  paymentId: z.number().optional()
});

export const Route = createFileRoute(
  "/_auth/_simple-layout/project/[id]/payment-complete"
)({
  validateSearch: searchSchema,
  component: PaymentComplete
});

function PaymentComplete() {
  const { paymentId } = Route.useSearch();

  const { mutateAsync: updateProjectPayment } = useUpdateProjectPayment();

  useEffect(() => {
    if (paymentId) {
      void (async () => {
        await updateProjectPayment({
          id: paymentId,
          data: { status: "paid" }
        });
      })();
    }
  }, []);

  return (
    <div className="mt-10 flex flex-row justify-center pb-10">
      <Card className="flex max-w-256 grow flex-col items-center justify-center gap-6 p-10">
        <BriefSent />
        <Heading2 className="w-full max-w-97.25 text-center">
          Your brief have been sent successfully
        </Heading2>
        <Link to="/dashboard" params={{}} search={{}}>
          <Button>Go to Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
}

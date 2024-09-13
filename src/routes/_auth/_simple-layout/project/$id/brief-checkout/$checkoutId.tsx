import { useEffect, useRef, useState } from "react";

import { createFileRoute, redirect } from "@tanstack/react-router";
import { FaCircleCheck } from "react-icons/fa6";

import BackLink from "@/components/shared-components/BackLink";
import Button from "@/components/shared-components/Button";
import PaymentForm from "@/components/shared-components/PaymentForm";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import Divider from "@/components/ui/divider.tsx";
import Heading3 from "@/components/ui/heading3.tsx";
import Heading4 from "@/components/ui/heading4.tsx";
import { UserType } from "@/enums/user.ts";
import { getProjectPayment } from "@/helpers/db/projectPayment.ts";
import { callEdgeFunction } from "@/helpers/edgeFunction.ts";
import { getProfileFullName } from "@/helpers/profile";
import useJammers from "@/hooks/queries/useJammers.ts";
import { getNameInitials } from "@/utils";

export const Route = createFileRoute(
  "/_auth/_simple-layout/project/$id/brief-checkout/$checkoutId"
)({
  async beforeLoad({ context, params }) {
    const { authProfile } = context;

    if (!authProfile || authProfile.user_type !== UserType.Client) {
      return redirect({ to: "/" });
    }

    const payment = await getProjectPayment(params.checkoutId).catch(() => {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/"
      });
    });

    if (payment.project_id !== params.id) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/"
      });
    }

    if (payment.status !== "pending") {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/project/$id/status",
        params: {
          id: payment.project_id
        }
      });
    }

    return { ...context, payment };
  },
  component: BriefCheckout
});

function BriefCheckout() {
  const context = Route.useRouteContext();
  const { id: projectId, checkoutId } = Route.useParams();

  const payment = context.payment!;

  const paymentIntentRequestDone = useRef(false);

  const [clientSecret, setClientSecret] = useState<string | undefined>();

  const { data: jammers = [] } = useJammers(payment.jammers);

  useEffect(() => {
    if (!paymentIntentRequestDone.current) {
      paymentIntentRequestDone.current = true;
      void (async () => {
        const response = await callEdgeFunction("createPaymentIntent");
        setClientSecret(response.clientSecret);
      })();
    }
  }, []);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-6 flex w-full flex-row justify-center pb-6">
      <div className="max-w-304 grow space-y-6">
        <BackLink
          to="/project/$id/status"
          params={{ id: payment.project_id }}
          title="Back to project details"
        />
        <Heading3>Checkout</Heading3>
        <div className="flex flex-row gap-8">
          <Card className="max-w-200 grow">
            <CardContent className="space-y-4 p-8">
              <div className="space-y-5">
                <Heading4>Pay with</Heading4>
                <div className="flex flex-row gap-3">
                  <FaCircleCheck className="h-5 w-5 text-blue-secondary-dark" />
                  <p className="text-lg font-semibold leading-6 text-blue-secondary-dark">
                    Payment Card
                  </p>
                </div>
              </div>
              <PaymentForm
                projectId={projectId}
                clientSecret={clientSecret}
                checkoutId={checkoutId}
              />
            </CardContent>
          </Card>
          <div className="max-w-96 grow bg-beige-secondary">
            <div className="space-y-4 rounded-lg bg-white px-5 py-6 shadow-md">
              <div className="space-y-1">
                <div className="text-lg font-semibold leading-6 text-blue-secondary-dark">
                  Mobile app for fitness startup
                </div>
                <div className="flex space-x-1.5">
                  <div className="text-sm font-normal text-gray-700">
                    Offer valid for
                  </div>
                  <div className="text-sm font-semibold text-gray-700">
                    07:56
                  </div>
                </div>
              </div>
              <Divider className="border-gray-300" />
              <div>
                {jammers.map((item) => {
                  return (
                    <div key={item.id} className="my-4">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-[48px] w-[48px]">
                            <Avatar>
                              <AvatarImage src={item.profile_image} />
                              <AvatarFallback>
                                {getNameInitials(getProfileFullName(item))}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="text-lg font-semibold leading-6 text-blue-secondary-dark">
                            {item.first_name} {item.last_name}
                          </div>
                        </div>
                        <div className="flex items-center justify-center text-sm font-normal text-gray-700">
                          <div>$500.00</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Divider className="border-gray-300" />
              <div className="flex justify-between">
                <div className="flex space-x-1">
                  <div className="text-sm font-semibold text-blue-secondary-dark">
                    Subtotal
                  </div>
                  <div className="text-sm font-normal text-blue-secondary-dark">
                    (2 Jammers)
                  </div>
                </div>
                <div className="text-sm font-normal text-gray-700">$99.00</div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm font-semibold text-blue-secondary-dark">
                  TAX
                </div>
                <div className="text-sm font-normal text-gray-700">$0.00</div>
              </div>
              <div className="flex justify-between">
                <div className="text-lg font-semibold leading-6 text-blue-secondary-dark">
                  Total
                </div>
                <div className="text-lg font-semibold leading-6 text-gray-700">
                  $99.00
                </div>
              </div>
              <Divider className="border-gray-300" />
              <Button>Check out</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

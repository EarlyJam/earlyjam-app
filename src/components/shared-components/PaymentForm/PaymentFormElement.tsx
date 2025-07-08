import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "@tanstack/react-router";

import Button from "@/components/shared-components/Button";
import Form from "@/components/shared-components/Form";
import { FormFieldType } from "@/enums/form.ts";

type PaymentFormElementProps = {
  projectId: string;
  clientSecret: string;
  checkoutId?: string;
  type?: "brief" | "upsell";
};

function PaymentFormElement(props: PaymentFormElementProps) {
  const { projectId, clientSecret, checkoutId, type = "brief" } = props;

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate({ from: "/project/[id]" });

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    // const elements = stripe.elements();
    const cardNumber = elements.getElement("cardNumber");
    const address = await elements.getElement("address")?.getValue();

    if (!cardNumber) {
      // There was an error or missing field in the form.
      return;
    }

    const paymentCompleteRoutePart =
      type === "brief" ? "payment-complete" : "upsell-payment-complete";

    const result = await stripe.confirmCardPayment(
      clientSecret,
      {
        //`Elements` instance that was used to create the Payment Element
        return_url: `${location.origin}/project/${projectId}/${paymentCompleteRoutePart}?paymentId=${checkoutId ?? ""}`,
        payment_method: {
          card: cardNumber,
          billing_details: {
            name: address?.value.name,
            address: address?.value.address,
            phone: address?.value.phone
          }
        }
      },
      {}
    );

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      void navigate({
        to: `/project/[id]/${paymentCompleteRoutePart}`,
        params: { id: projectId },
        search: { paymentId: Number(checkoutId) }
      });
    }
  };

  return (
    <Form
      fieldsContainerClassName="grid grid-cols-2 space-y-0 gap-x-6 gap-y-4"
      fields={[
        {
          name: "card_number",
          label: "Card Number",
          type: FormFieldType.CardNumber,
          className: "col-span-2"
        },
        {
          name: "expiration_date",
          label: "Expiration Date",
          type: FormFieldType.CardExpiryDate,
          className: "col-span-2"
        },
        {
          name: "cvv",
          label: "CVV",
          type: FormFieldType.CardSecurityCode
        },
        {
          name: "billing_address",
          label: (
            <p className="mb-2.5 text-base font-semibold uppercase leading-5.5 text-gray-700">
              Billing address
            </p>
          ),
          type: FormFieldType.PaymentAddress,
          className: "col-span-2"
        }
      ]}
      onSubmit={handleSubmit}
      onError={(errors) => {
        console.log(errors);
      }}
    >
      <Button variant="outline" type="submit" className="w-auto">
        Save
      </Button>
    </Form>
  );
}

export default PaymentFormElement;

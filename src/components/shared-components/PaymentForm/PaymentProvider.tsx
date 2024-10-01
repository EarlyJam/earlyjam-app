import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentFormElement from "@/components/shared-components/PaymentForm/PaymentFormElement.tsx";

const PUBLISHABLE_KEY =
  "pk_test_51PVa3b056bNS3sfohSQqtQvoikuBcuoH2gmj69lL7ooTitv7evF28vTiG1RX7yJ2omz0eNboW2YkOwmEKxOfGs2L00xz8CLJPV";
// const CLIENT_SECRET =
//   "sk_test_51PVa3b056bNS3sfoyOKK4ZlBC6mp9L4pnpJYcSi9fyb48HWS2O4JQ080aoPAFzlAwVU7MuX8kP24o2qFxdS99oEn00R2lTEFuL";

// Live keys
// const PUBLISHABLE_KEY =
//   "pk_live_51PVa3b056bNS3sfo476jJ4bW6ieLJJxOjIhJrqqtx6YxVWe4AFm3a2ef7LRxD0Joj1hvryOHtJ4wd3GK8rtjpzJ1005by9s5sE";
// const CLIENT_SECRET =
//   "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";
const stripePromise = loadStripe(PUBLISHABLE_KEY);

type PaymentFormProps = {
  projectId: string;
  clientSecret: string;
  checkoutId?: string;
  type?: "brief" | "upsell";
};

function PaymentForm(props: PaymentFormProps) {
  const { projectId, clientSecret, checkoutId, type = "brief" } = props;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        // clientSecret: `${formId}_secret_${CLIENT_SECRET}`
        mode: "payment",
        currency: "usd",
        amount: 99,
        fonts: [
          {
            src: 'url(https://nlsfcybznfjmowradcom.supabase.co/storage/v1/object/public/earlyjam-media/fonts/gilroy/Gilroy-Regular.ttf) format("truetype")',
            family: "gilroy",
            weight: "400"
          }
        ],
        appearance: {
          variables: {
            fontFamily: "gilroy",
            borderRadius: "8px",
            gridRowSpacing: "16px"
          },
          rules: {
            ".Input": {
              border: "1px solid #D0D5DD"
            },
            ".Label": {
              color: "#051D56",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "6px"
            }
          }
        }
      }}
    >
      <PaymentFormElement
        projectId={projectId}
        clientSecret={clientSecret}
        checkoutId={checkoutId}
        type={type}
      />
    </Elements>
  );
}

export default PaymentForm;

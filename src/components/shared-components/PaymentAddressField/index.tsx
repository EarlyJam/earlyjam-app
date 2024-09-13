import * as StripeElements from "@stripe/react-stripe-js";

function PaymentAddressField() {
  return (
    <StripeElements.AddressElement
      options={{
        mode: "billing",
        autocomplete: { mode: "automatic" },
        display: { name: "split" }
      }}
    />
  );
}

export default PaymentAddressField;

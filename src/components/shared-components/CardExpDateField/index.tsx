import * as StripeElements from "@stripe/react-stripe-js";

function CardExpDateField() {
  return (
    <div className="flex h-10 w-full flex-grow flex-row items-center rounded-lg border border-gray-400-disable bg-background px-3 py-2 text-sm text-gray-800 shadow-ej-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
      <StripeElements.CardExpiryElement
        className="w-full"
        options={{
          style: {}
        }}
      />
    </div>
  );
}

export default CardExpDateField;

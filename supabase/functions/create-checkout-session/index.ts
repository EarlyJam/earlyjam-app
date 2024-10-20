// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import Stripe from "npm:stripe@^16.10.0";

const stripe = new Stripe(Deno.env.get("STRIPE_API_KEY_TEST")!, {
  httpClient: Stripe.createFetchHttpClient()
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*"
};

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { type, successUrl } = await req.json();

  const briefPriceId = Deno.env.get("STRIPE_PRICE_ID_BRIEF")!;
  const upsellPriceId = Deno.env.get("STRIPE_PRICE_ID_UPSELL")!;

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    success_url: successUrl,
    line_items: [
      {
        price: type === "upsell" ? upsellPriceId : briefPriceId,
        quantity: 1
      }
    ]
  };

  const data = await stripe.checkout.sessions.create(params);

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-payment-intent' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

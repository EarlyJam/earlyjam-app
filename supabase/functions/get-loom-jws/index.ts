// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import * as jose from "https://deno.land/x/jose@v5.7.0/index.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type"
};

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const PRIVATE_PEM = Deno.env.get("PRIVATE_PEM");

  // const PRIVATE_PEM = await Deno.readTextFile("loom.pem");
  if (!PRIVATE_PEM) {
    return new Response("No private key found", {
      status: 500,
      headers: corsHeaders
    });
  }

  const privateKey = await jose.importPKCS8(PRIVATE_PEM, "RS256");
  const jws = await new jose.SignJWT({})
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setIssuer("a651804c-698a-486a-91eb-27124e7971b9")
    .setExpirationTime("30m")
    .sign(privateKey);

  const data = {
    jws
  };

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-loom-jws' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

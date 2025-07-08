import { createClient } from "@supabase/supabase-js";

import config from "@/config";

console.log("Supabase URL:", config.BAAS_API_URL);
console.log("Supabase Key:", config.BAAS_API_KEY);

const client = createClient(config.BAAS_API_URL, config.BAAS_API_KEY);

export default client;

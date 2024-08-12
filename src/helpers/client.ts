import { createClient } from "@supabase/supabase-js";

import config from "@/config";

const client = createClient(config.BAAS_API_URL, config.BAAS_API_KEY);

export default client;

import config from "@/config";
import { createClient } from "@supabase/supabase-js";

const client = createClient(config.BAAS_API_URL, config.BAAS_API_KEY);

export default client;

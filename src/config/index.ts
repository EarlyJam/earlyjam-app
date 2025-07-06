// Debug: log all available environment variables
console.log('import.meta.env:', import.meta.env);

export const BAAS_API_URL: string = import.meta.env.VITE_SUPABASE_URL as string;
export const BAAS_API_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const MEDIA_STORAGE_BUCKET = "earlyjam-media";

const config: {
  BAAS_API_URL: string;
  BAAS_API_KEY: string;
  MEDIA_STORAGE_BUCKET: string;
} = {
  BAAS_API_URL,
  BAAS_API_KEY,
  MEDIA_STORAGE_BUCKET
} as const;

export default config;

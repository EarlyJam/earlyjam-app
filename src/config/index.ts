export const BAAS_API_URL = "https://nlsfcybznfjmowradcom.supabase.co";
export const BAAS_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZjeWJ6bmZqbW93cmFkY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxMzg1NDAsImV4cCI6MjAzNTcxNDU0MH0.bBycz43zP7TgxBKAxVtoWQQRdsyhDApwnI1n7PMlFuQ";

export const MEDIA_STORAGE_BUCKET = "earlyjam-media";

const config = {
  BAAS_API_URL,
  BAAS_API_KEY,
  MEDIA_STORAGE_BUCKET,
} as const;

export default config;

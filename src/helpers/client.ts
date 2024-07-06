import { createClient } from "@supabase/supabase-js";

const client = createClient(
  "https://nlsfcybznfjmowradcom.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZjeWJ6bmZqbW93cmFkY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxMzg1NDAsImV4cCI6MjAzNTcxNDU0MH0.bBycz43zP7TgxBKAxVtoWQQRdsyhDApwnI1n7PMlFuQ",
);

export default client;

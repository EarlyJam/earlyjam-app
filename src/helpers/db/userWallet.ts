import { DB_TABLES } from "@/constants/supabase/db.ts";
import client from "@/helpers/client.ts";
import { UserWallet } from "@/types/userWallet.ts";

export async function getUserWallet(userId: string) {
  const { error, data } = await client
    .from(DB_TABLES.userWallets)
    .select("*")
    .eq("user_id", userId)
    .single<UserWallet>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateUserWallet(
  userId: string,
  data: Partial<UserWallet>
) {
  await client.from(DB_TABLES.userWallets).update(data).eq("user_id", userId);
}

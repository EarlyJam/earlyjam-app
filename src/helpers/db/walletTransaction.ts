import { DB_TABLES } from "@/constants/supabase/db.ts";
import client from "@/helpers/client.ts";
import { WalletTransaction } from "@/types/userWallet.ts";

export async function createWalletTransaction(
  data: Partial<WalletTransaction>
) {
  const { error, data: responseData } = await client
    .from(DB_TABLES.walletTransactions)
    .insert(data)
    .select("*")
    .single<WalletTransaction>();

  if (error) {
    throw new Error(error.message);
  }

  return responseData;
}

export async function getWalletTransactions(
  filter: Pick<WalletTransaction, "type">
) {
  const { error, data } = await client
    .from(DB_TABLES.walletTransactions)
    .select("*")
    .match(filter)
    .order("created_at", { ascending: false })
    .returns<WalletTransaction[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateWalletTransaction(
  id: number,
  data: Partial<WalletTransaction>
) {
  await client.from(DB_TABLES.walletTransactions).update(data).eq("id", id);
}

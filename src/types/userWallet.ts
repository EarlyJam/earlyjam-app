export type UserWallet = {
  id: number;
  user_id: string;
  wallet_balance: number;
  created_at: string;
  updated_at: string;
};

export type WalletTransaction = {
  id: number;
  wallet_id: number;
  user_id: string;
  type: "withdraw";
  description?: string;
  status: "pending" | "complete" | "failed";
  metadata?: Record<string, unknown>;
  amount: number;
  created_at: string;
  updated_at: string;
};

import { createFileRoute } from "@tanstack/react-router";

import CashNote from "@/assets/svgs/CashNote.tsx";
import InfoStar from "@/assets/svgs/InfoStar.tsx";
import Withdraw from "@/assets/svgs/Withdraw.tsx";
import WithdrawBackground from "@/assets/svgs/WithdrawBackground.tsx";
import Button from "@/components/shared-components/Button";
import Heading2 from "@/components/ui/heading2.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs.tsx";
import { sendEmail } from "@/helpers/email.ts";
import useCreateWalletTransaction from "@/hooks/mutations/useCreateWalletTransaction.ts";
import useUpdateUserWallet from "@/hooks/mutations/useUpdateUserWallet.ts";
import useAuthProfile from "@/hooks/queries/useAuthProfile.ts";
import useUserWallet from "@/hooks/queries/useUserWallet.ts";
import { useToast } from "@/hooks/useToast.ts";

export const Route = createFileRoute("/_auth/_app-layout/jammer-wallet")({
  component: JammerWallet
});

function JammerWallet() {
  const { data: profile } = useAuthProfile();
  const { data: wallet } = useUserWallet();

  const { toast } = useToast();

  const { mutateAsync: createWalletTransaction } = useCreateWalletTransaction();
  const { mutateAsync: updateUserWallet } = useUpdateUserWallet();

  const walletBalance = wallet?.wallet_balance ?? 0;

  const handleWithdraw = async () => {
    if (!wallet) {
      toast({
        title: "Error",
        description: "Wallet not found",
        variant: "destructive"
      });

      return;
    }

    if (walletBalance < 1) {
      toast({
        title: "Error",
        description: "Insufficient balance",
        variant: "destructive"
      });

      return;
    }

    const transaction = await createWalletTransaction({
      wallet_id: wallet.id,
      user_id: wallet.user_id,
      type: "withdraw",
      amount: walletBalance
    });

    if (profile) {
      await updateUserWallet({
        data: {
          wallet_balance: 0
        }
      });
      await sendEmail(
        "justin@earlyjam.com",
        "EarlyJam Withdrawal Request",
        `User ${profile.first_name} ${profile.last_name} (id: ${profile.id}) has requested a withdrawal of ${walletBalance.toFixed(2)} from their wallet (trxn: ${transaction.id.toString()})`
      );

      await sendEmail(
        profile.email,
        "EarlyJam Withdrawal Request",
        `Withdrawal request has been generated for ${profile.first_name} ${profile.last_name} (id: ${profile.id}) with a balance of ${walletBalance.toFixed(2)} from their wallet (trxn: ${transaction.id.toString()})`
      );
    }

    toast({
      title: "Success",
      description: "Withdrawal request has been generated"
    });
  };

  return (
    <div className="space-y-2.5 overflow-auto py-10 sm:px-8 sm:pt-6">
      <div className="flex w-full flex-row items-end justify-between px-5 py-3 sm:px-0">
        <Heading2 className="text-gray-900">Payouts</Heading2>
      </div>
      <Tabs value="withdraw">
        <TabsList className="px-5 sm:px-0">
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        <TabsContent value="withdraw" className="space-y-5 px-5 sm:px-0">
          <p className="font-dm-sans text-sys-on-surface-lighter text-sm">
            Last updated time 5:15 PM
          </p>
          <div className="relative w-full rounded-xl border border-gray-300 bg-white">
            <div className="absolute left-0 top-0">
              <WithdrawBackground />
            </div>
            <div className="flex w-full flex-col items-center gap-6 p-6">
              <div className="flex flex-row items-center gap-1">
                <CashNote />
                <p className="font-dm-sans text-sm text-gray-700">
                  Available Amount
                </p>
              </div>
              <p className="text-5.5xl leading-19 font-semibold text-blue-secondary-dark">
                ${walletBalance.toFixed(2)}
              </p>
              <Button
                endIcon={<Withdraw />}
                className="h-14 w-auto text-base font-semibold"
                onClick={handleWithdraw}
              >
                Withdraw
              </Button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <InfoStar />
            <p className="font-dm-sans text-sm text-gray-700">
              We’ll pay you within 14 days from withdrawal.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import Table from "@/components/shared-components/Table";
import Heading3 from "@/components/ui/heading3.tsx";
import useUpdateWalletTransaction from "@/hooks/mutations/useUpdateWalletTransaction.ts";
import useWalletTransactions from "@/hooks/queries/useWalletTransactions.ts";
import { WalletTransaction } from "@/types/userWallet.ts";

export const Route = createFileRoute(
  "/_auth/_app-layout/_super-admin/withdrawal-requests"
)({
  component: WithdrawalRequests
});

function WithdrawalRequests() {
  const { data: withdrawalTransactions = [] } = useWalletTransactions({
    type: "withdraw"
  });

  const { mutateAsync: updateWalletTransaction } = useUpdateWalletTransaction();

  const handleMarkAsPaid = async (data: WalletTransaction) => {
    await updateWalletTransaction({
      id: data.id,
      data: {
        status: "complete"
      }
    });
  };

  return (
    <div className="overflow-auto">
      <div className="mx-8 my-5 space-y-8">
        <Heading3>Withdrawal Requests</Heading3>
        <Table
          headerCellClassName="text-left"
          cellClassName="max-w-64 truncate text-sm font-semibold text-blue-secondary-dark cursor-pointer"
          columnDefs={[
            {
              headerName: "ID",
              field: "id",
              copyOnClick: true
            },
            {
              headerName: "USER",
              field: "user_id",
              copyOnClick: true
            },
            {
              headerName: "AMOUNT",
              field: "amount",
              render: (amount) => `$${Number(amount).toFixed(2)}`
            },
            {
              headerName: "STATUS",
              field: "status",
              defaultValue: "pending"
            }
          ]}
          actionMenuItems={[
            {
              label: "Mark as Paid",
              value: "mark_as_paid"
            }
          ]}
          onRowActionClick={(action, data) => {
            if (action === "mark_as_paid") {
              handleMarkAsPaid(data);
            }
          }}
          data={withdrawalTransactions}
        />
      </div>
    </div>
  );
}

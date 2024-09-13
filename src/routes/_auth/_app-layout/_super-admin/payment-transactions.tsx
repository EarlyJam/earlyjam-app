import { createFileRoute } from "@tanstack/react-router";

import Table from "@/components/shared-components/Table";
import Heading3 from "@/components/ui/heading3.tsx";
import useProjectPayments from "@/hooks/queries/useProjectPayments.ts";
import { cn } from "@/utils";

export const Route = createFileRoute(
  "/_auth/_app-layout/_super-admin/payment-transactions"
)({
  component: PaymentTransactions
});

function PaymentTransactions() {
  const { data: payments = [] } = useProjectPayments();

  return (
    <div className="overflow-auto">
      <div className="mx-8 my-5 space-y-8">
        <Heading3>Jammer Management</Heading3>
        {/*<TextField*/}
        {/*  className="max-w-card"*/}
        {/*  value={search}*/}
        {/*  onChange={(e) => setSearch(e.target.value)}*/}
        {/*  placeholder="Search..."*/}
        {/*/>*/}
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
              headerName: "PROJECT ID",
              field: "project_id",
              copyOnClick: true
            },
            {
              headerName: "JAMMERS",
              field: "jammers",
              render: (jammers) => {
                return (jammers as string[]).join(", ");
              }
            },
            {
              headerName: "STATUS",
              field: "status",
              copyOnClick: true,
              defaultValue: "under_review",
              render: (status) => (
                <div className="flex items-center space-x-2">
                  <div
                    className={cn("h-1 w-1 rounded-full", {
                      "bg-functional-success-500": status === "paid",
                      "bg-functional-error-100": status === "pending"
                    })}
                  />
                  <div
                    className={cn("text-sm font-semibold", {
                      "text-functional-success-500": status === "paid",
                      "text-functional-error-100": status === "pending"
                    })}
                  >
                    {status}
                  </div>
                </div>
              )
            }
          ]}
          data={payments}
        />
      </div>
    </div>
  );
}

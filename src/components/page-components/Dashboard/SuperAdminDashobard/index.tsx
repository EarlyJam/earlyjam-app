import { useMemo, useRef, useState } from "react";

import { LuCheck, LuInfo, LuX } from "react-icons/lu";

import JammerInfoModal from "@/components/page-components/Dashboard/SuperAdminDashobard/JammerInfoModal.tsx";
import Table from "@/components/shared-components/Table";
import TextField from "@/components/shared-components/TextField";
import { Button } from "@/components/ui/button.tsx";
import Heading3 from "@/components/ui/heading3.tsx";
import { getProfileFullName } from "@/helpers/profile";
import useUpdateProfile from "@/hooks/mutations/useUpdateProfile.ts";
import useJammers from "@/hooks/queries/useJammers.ts";
import { Profile } from "@/types/profile.ts";
import { cn } from "@/utils";

function SuperAdminDashboard() {
  const { data: jammers = [], refetch: refetchJammers } = useJammers();

  const [search, setSearch] = useState("");
  const [loadingIds, setLoadingIds] = useState<string[]>([]);
  const [selectedJammerId, setSelectedJammerId] = useState<string>();

  const jammerInfoButtonRef = useRef<HTMLButtonElement>(null);

  const { mutateAsync: updateProfile } = useUpdateProfile();

  const data = useMemo(
    () => jammers.map((j) => ({ ...j, name: getProfileFullName(j) })),
    [jammers]
  );

  const filteredData = useMemo(() => {
    if (!search) {
      return data;
    }
    return data.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase()) ||
        d.id.toLowerCase().includes(search.toLowerCase()) ||
        (d.status ?? "under_review")
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [data, search]);

  const updateProfileStatus = async (id: string, status: Profile["status"]) => {
    setLoadingIds((ids) => [...ids, id]);
    await updateProfile({
      id,
      data: {
        status
      }
    });
    await refetchJammers();
    setLoadingIds((ids) => ids.filter((i) => i !== id));
  };

  return (
    <div className="overflow-auto">
      <div className="mx-8 my-5 space-y-8">
        <Heading3>Jammer Management</Heading3>
        <TextField
          className="max-w-card"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
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
              headerName: "NAME",
              field: "name",
              copyOnClick: true
            },
            {
              headerName: "EMAIL",
              field: "email",
              copyOnClick: true
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
                      "bg-functional-success-500": status === "active",
                      "bg-functional-error-100": status === "rejected",
                      "bg-functional-warning-500": status === "under_review"
                    })}
                  />
                  <div
                    className={cn("text-sm font-semibold", {
                      "text-functional-success-500": status === "active",
                      "text-functional-error-100": status === "rejected",
                      "text-functional-warning-500": status === "under_review"
                    })}
                  >
                    {status as string}
                  </div>
                </div>
              )
            }
          ]}
          data={filteredData}
          showActionColumn
          actionMenuItems={(row) => {
            const items = [
              {
                value: "info",
                label: "Jammer Info",
                icon: <LuInfo />,
                className: "text-blue-secondary-dark"
              }
            ];
            if (!row.status || row.status === "under_review") {
              items.push(
                {
                  value: "accept",
                  label: "Accept",
                  icon: <LuCheck />,
                  className: "text-functional-success-500"
                },
                {
                  value: "reject",
                  label: "Reject",
                  icon: <LuX />,
                  className: "text-functional-error-100"
                }
              );
            }

            return items;
          }}
          onRowActionClick={(value, data) => {
            if (value === "accept") {
              void updateProfileStatus(data.id, "active");
            } else if (value === "reject") {
              void updateProfileStatus(data.id, "rejected");
            } else if (value === "info") {
              setSelectedJammerId(data.id);
              jammerInfoButtonRef.current?.click();
            }
          }}
          loadingIds={loadingIds}
        />
      </div>
      <JammerInfoModal id={selectedJammerId}>
        <Button
          ref={jammerInfoButtonRef}
          className="hidden"
          onClick={() => {
            console.log("open jammer info");
          }}
        >
          Open Jammer Info
        </Button>
      </JammerInfoModal>
    </div>
  );
}

export default SuperAdminDashboard;

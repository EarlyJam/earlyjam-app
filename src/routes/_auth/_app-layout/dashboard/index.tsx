import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import SuperAdminDashboard from "@/components/page-components/Dashboard/SuperAdminDashobard";
import UserDashboard from "@/components/page-components/Dashboard/UserDashboard";
import { QUERY_PARAMS } from "@/constants/urlQuery.ts";
import useIsUserSuperAdmin from "@/hooks/useIsUserSuperAdmin.ts";

const dashboardSearchSchema = z.object({
  [QUERY_PARAMS.Dashboard.page]: z.number().positive().min(1).optional(),
  [QUERY_PARAMS.Dashboard.tab]: z
    .enum([
      "awaiting_response",
      "accepted",
      "rejected",
      "closed",
      "drafts",
      "completed",
      "design_implementation",
      "in_progress"
    ])
    .optional()
});

export const Route = createFileRoute("/_auth/_app-layout/dashboard/")({
  validateSearch: dashboardSearchSchema,
  component: Dashboard
});

function Dashboard() {
  const { p: page = 1, t: status = "awaiting_response" } = Route.useSearch();

  const isSuperAdmin = useIsUserSuperAdmin();

  if (isSuperAdmin === "undetermined") return <></>;

  if (isSuperAdmin) {
    return <SuperAdminDashboard />;
  }

  return <UserDashboard page={page} status={status} />;
} 
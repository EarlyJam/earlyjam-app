import ProjectsGrid from "@/components/page-components/Dashboard/ProjectsGrid";
import UnderReviewBanner from "@/components/page-components/Dashboard/UnderReviewBanner";
import Button from "@/components/shared-components/Button";
import Heading2 from "@/components/ui/Heading2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { ProjectJammer } from "@/types/project";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { z } from "zod";

const TABS: Record<string, { label: string; value: ProjectJammer["status"] }> =
  {
    ResponsePending: {
      label: "Waiting for response",
      value: "awaiting_response",
    },
    Accepted: {
      label: "Open Projects",
      value: "accepted",
    },
    Closed: {
      label: "Closed Projects",
      value: "closed",
    },
  } as const;

const dashboardSearchSchema = z.object({
  page: z.number().positive().min(1).optional().default(1),
});

export const Route = createFileRoute("/_auth/_app-layout/(dashboard)/")({
  validateSearch: dashboardSearchSchema,
  component: Dashboard,
});

function Dashboard() {
  const { data: profile } = useAuthProfile();

  const { page = 1 } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [selectedTab, setSelectedTab] = useState(TABS.ResponsePending.value);

  if (!profile) return null;

  const isUnderReview = profile.status === "under_review";

  return (
    <div className="py-10 sm:pl-8 sm:pt-5 sm:pr-28 space-y-7 overflow-auto">
      <div className="flex flex-row items-end justify-between w-full px-5 sm:px-0">
        <Heading2 className="text-gray-900">All Jams</Heading2>
        <Button
          variant="ghost"
          className="hidden sm:flex w-auto text-sm bg-beige-secondary py-2 px-6"
          endIcon={<MdOutlineVideoLibrary width={20} height={20} />}
        >
          Quick Guide
        </Button>
      </div>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          setSelectedTab(value as ProjectJammer["status"]);
          void navigate({ search: (prev) => ({ ...prev, page: 1 }) });
        }}
      >
        <TabsList className="px-5 sm:px-0">
          {Object.values(TABS).map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.values(TABS).map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="px-5 sm:px-0"
          >
            {isUnderReview ? (
              <UnderReviewBanner />
            ) : (
              <ProjectsGrid
                page={page}
                onPageChange={(p) => {
                  void navigate({ search: (prev) => ({ ...prev, page: p }) });
                }}
                status={selectedTab}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

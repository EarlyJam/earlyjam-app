import { useState } from "react";

import { Link, useNavigate } from "@tanstack/react-router";
import { LuPlus } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";

import ProjectsGrid from "@/components/page-components/Dashboard/ProjectsGrid";
import UnderReviewBanner from "@/components/page-components/Dashboard/UnderReviewBanner";
import Button from "@/components/shared-components/Button";
import Heading2 from "@/components/ui/heading2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QUERY_PARAMS } from "@/constants/urlQuery.ts";
import { UserType } from "@/enums/user";
import useAuthProfile from "@/hooks/queries/useAuthProfile";
import { ProjectStatus } from "@/types/project";

const TABS: Record<string, { label: string; value: ProjectStatus }> = {
  ResponsePending: {
    label: "Waiting for response",
    value: "awaiting_response"
  },
  Accepted: {
    label: "Open Projects",
    value: "accepted"
  },
  Closed: {
    label: "Closed Projects",
    value: "closed"
  }
} as const;

type UserDashboardProps = {
  page: number;
  status: ProjectStatus | "drafts";
};

function UserDashboard(props: UserDashboardProps) {
  const { data: profile } = useAuthProfile();

  const { page = 1, status } = props;
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(status);

  if (!profile) return null;

  const isUnderReview = profile.status === "under_review";

  const tabs = Object.values(TABS).map((tab) => tab.value as string);

  if (profile.user_type === UserType.Client) {
    tabs.push("drafts");
  }

  return (
    <div className="space-y-7 overflow-auto py-10 sm:pl-8 sm:pr-28 sm:pt-5">
      <div className="flex w-full flex-row items-end justify-between px-5 sm:px-0">
        <Heading2 className="text-gray-900">
          {profile.user_type === UserType.Jammer ? "All Jams" : "All Projects"}
        </Heading2>
        {profile.user_type === UserType.Jammer ? (
          <Button
            variant="ghost"
            className="hidden w-auto bg-beige-secondary px-6 py-2 text-sm sm:flex"
            endIcon={<MdOutlineVideoLibrary className="h-5 w-5" />}
          >
            Quick Guide
          </Button>
        ) : (
          <Link to="/project/create">
            <Button
              variant="default"
              className="hidden w-auto sm:flex"
              endIcon={<LuPlus width={18} height={18} />}
            >
              Add Project
            </Button>
            <Button
              variant="default"
              className="flex h-auto w-auto rounded-full p-2.5 sm:hidden"
            >
              <LuPlus className="h-4.5 w-4.5" />
            </Button>
          </Link>
        )}
      </div>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => {
          const newValue = value as ProjectStatus;
          setSelectedTab(newValue);
          void navigate({
            search: (prev) => ({
              ...prev,
              [QUERY_PARAMS.Dashboard.page]: 1,
              [QUERY_PARAMS.Dashboard.tab]: newValue
            })
          });
        }}
      >
        <TabsList className="px-5 sm:px-0">
          {Object.values(TABS).map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
          {profile.user_type === UserType.Client && (
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          )}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="px-5 sm:px-0">
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

export default UserDashboard;

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
import EmailVerificationBanner from "@/components/page-components/Dashboard/EmailVerificationBanner";
import useAuthUser from "@/hooks/queries/useAuthUser";
import { ProjectStatus } from "@/types/project";
import { getNameInitials } from "@/utils";

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
  const { data: user } = useAuthUser();

  const { page = 1, status } = props;
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(status);

  if (!profile) return null;

  const isUnderReview = profile.status === "under_review";
  const isEmailVerified = !!user?.email_confirmed_at;

  const tabs = Object.values(TABS).map((tab) => tab.value as string);

  if (profile.user_type === UserType.Client) {
    tabs.push("drafts");
  }

  // Helper for user initials
  const initials =
    (profile?.first_name && profile?.last_name
      ? getNameInitials(`${profile.first_name} ${profile.last_name}`)
      : user?.email?.[0]?.toUpperCase()) || "";
  return (
    <div className="bg-[#f7f5f0] min-h-screen flex flex-col items-stretch w-full">
      {/* Top Bar */}
      <div className="bg-[#f7f5f0] shadow-sm w-full">
        <div className="flex flex-row items-center justify-between px-28 py-8 w-full">
          {/* Logo */}
          <div className="flex flex-row gap-[18px] items-center">
            <div className="h-[46px] w-[104px]">
              <img src="/logo.png" alt="EarlyJam Logo" className="h-full w-full object-contain" />
            </div>
            <div className="h-[19px] w-[62px]" />
          </div>
          {/* User Info */}
          <div className="flex flex-row gap-3 items-center h-12">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-[#051d56] font-gilroy-semibold text-xl">
              {initials}
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-gilroy-semibold text-[#051d56] text-[16px] leading-[22px]">
                {profile?.first_name} {profile?.last_name}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 w-full">
        <div className="flex flex-col gap-[30px] px-28 py-[30px] w-full">
          {/* Greeting and Action */}
          <div className="flex flex-row items-center justify-between w-full">
            <div className="font-gilroy-bold text-[24px] leading-[28px] text-black">
              Good morning, {profile?.first_name || user?.email?.split("@")[0]}
            </div>
            <button className="bg-[#7ad38e] flex flex-row gap-2 items-center px-7 py-2.5 rounded-[22px] shadow-sm hover:bg-[#6bc17e] transition-colors">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 12 12">
                <path d="M12 6.85714H6.85714V12H5.14286V6.85714H0V5.14286H5.14286V0H6.85714V5.14286H12V6.85714Z" fill="#051D56" />
              </svg>
              <span className="font-gilroy-semibold text-[#051d56] text-[16px] leading-[20px]">Create Projects</span>
            </button>
          </div>
          {/* Main Card */}
          <div className="bg-white rounded-2xl w-full">
            <div className="flex flex-col items-center px-8 py-10 w-full">
              {/* Section Title and Filter */}
              <div className="flex flex-row items-center justify-between w-full mb-8">
                <div className="font-gilroy-semibold text-[#051d56] text-[28px] leading-[32px]">All Projects</div>
                <div className="flex flex-row gap-2 items-center">
                  <span className="font-gilroy-regular text-[#051d56] text-[16px] leading-[22px]">Waiting Response</span>
                  {/* Toggle */}
                  <div className="w-11 h-6 bg-[#cecece] rounded-[40px] relative flex items-center">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
              {/* Project Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {/* TODO: Map over actual projects. Example card below: */}
                <div className="bg-white rounded-2xl w-full border border-[#eaecf0] flex flex-col gap-6 p-5">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="bg-[#feefd0] rounded px-1 pt-1 pb-0.5">
                        <span className="font-gilroy-semibold text-[#faad14] text-[12px] leading-[18px]">Waiting for Jammer</span>
                      </div>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 15 4">
                        <circle cx="2" cy="2" r="2" fill="#475467" />
                        <circle cx="7.5" cy="2" r="2" fill="#475467" />
                        <circle cx="13" cy="2" r="2" fill="#475467" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <div className="font-gilroy-semibold text-[20px] leading-[24px] w-full">Mobile app for fitness startup</div>
                      <div className="font-gilroy-regular text-[14px] leading-[20px] text-[#475467] w-full truncate">
                        Playwrite is an online exam prep platform that helps Primary 3-6 students (9-12 years old) master PSLE English with regular practice and AI feedback.
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-row gap-2 items-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 15 15">
                        <circle cx="7.5" cy="7.5" r="7" stroke="#475467" strokeWidth="1.5" />
                      </svg>
                      <span className="font-gilroy-regular text-[14px] leading-[20px] text-[#475467]">Mobile App</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 13 14">
                        <rect x="1" y="2" width="11" height="11" rx="2" stroke="#475467" strokeWidth="1.5" />
                      </svg>
                      <span className="font-gilroy-regular text-[14px] leading-[20px] text-[#475467]">Nov 13, 2023</span>
                    </div>
                  </div>
                </div>
                {/* Repeat for other project cards... */}
              </div>
              {/* Pagination */}
              <div className="flex flex-row gap-2 items-center mt-8">
                <button className="w-5 h-5 flex items-center justify-center text-[#D0D5DD]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 7 12">
                    <path d="M0.25 6.25L5 10.92C5.33 11.25 5.83 11.25 6.17 10.92C6.5 10.58 6.5 10.08 6.17 9.75L2.08 5.58L6.17 1.42C6.5 1.08 6.5 0.58 6.17 0.25C6 0.08 5.83 0 5.58 0C5.33 0 5.17 0.08 5 0.25L0.25 4.92C-0.08 5.33 -0.08 5.83 0.25 6.25Z" fill="#D0D5DD" />
                  </svg>
                </button>
                <button className="w-6 h-6 bg-[#7ad38e] rounded-[60px] flex items-center justify-center text-black font-gilroy-semibold text-[14px]">1</button>
                <button className="w-6 h-6 flex items-center justify-center text-[#667085] font-gilroy-medium text-[14px]">2</button>
                <button className="w-6 h-6 flex items-center justify-center text-[#667085] font-gilroy-medium text-[14px]">3</button>
                <button className="w-6 h-6 flex items-center justify-center text-[#667085] font-gilroy-medium text-[14px]">4</button>
                <button className="w-5 h-5 flex items-center justify-center text-[#D0D5DD]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 7 12">
                    <path d="M6.14 4.95L1.43 0.25C1.35 0.17 1.26 0.11 1.15 0.06C1.05 0.02 0.94 0 0.83 0C0.72 0 0.62 0.02 0.51 0.06C0.41 0.11 0.32 0.17 0.24 0.25C0.09 0.4 0 0.61 0 0.83C0 1.05 0.09 1.27 0.24 1.42L4.37 5.59L0.24 9.71C0.09 9.87 0 10.08 0 10.3C0 10.52 0.09 10.73 0.24 10.89C0.32 10.97 0.41 11.03 0.51 11.07C0.61 11.12 0.72 11.14 0.83 11.14C0.94 11.14 1.05 11.12 1.15 11.07C1.26 11.03 1.35 10.97 1.43 10.89L6.14 6.18C6.23 6.1 6.29 6.01 6.34 5.9C6.39 5.8 6.41 5.68 6.41 5.57C6.41 5.45 6.39 5.34 6.34 5.23C6.29 5.13 6.23 5.03 6.14 4.95Z" fill="#475467" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

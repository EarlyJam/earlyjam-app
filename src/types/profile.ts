import { UserType } from "@/enums/user";

export type Profile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  profile_image?: string;
  onboarding_done?: boolean;
  work_experience?: string;
  expertise?: string[];
  linkedin_url?: string;
  portfolio_links?: { url: string }[];
  project_images?: {
    id: string;
    name: string;
    url: string;
  }[];
  created_at: string;
  updated_at: string;
};

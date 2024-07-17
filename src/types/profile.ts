import { UserType } from "@/enums/user";

export type Profile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  profile_image?: string;
  created_at: string;
  updated_at: string;
};

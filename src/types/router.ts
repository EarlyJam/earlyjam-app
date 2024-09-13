import { User } from "@supabase/supabase-js";

import { Profile } from "@/types/profile.ts";
import { ProjectPayment } from "@/types/projectPayment.ts";

export type RouterContext = {
  authUser?: User;
  authProfile?: Profile;
  payment?: ProjectPayment;
  contextInitiated: boolean;
};

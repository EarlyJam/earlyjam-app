import { User } from "@supabase/supabase-js";

import { Profile } from "@/types/profile.ts";
import { ProjectPayment } from "@/types/projectPayment.ts";
import { UpsellRequest } from "@/types/upsellRequest.ts";

export type RouterContext = {
  authUser?: User;
  authProfile?: Profile;
  payment?: ProjectPayment;
  upsellRequest?: UpsellRequest;
  contextInitiated: boolean;
};

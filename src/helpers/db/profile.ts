import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { DB_TABLES } from "@/constants/supabase/db.ts";
import client from "@/helpers/client";
import { Profile } from "@/types/profile";

dayjs.extend(utc);

export async function updateProfile(
  id: string,
  user: Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
) {
  await client
    .from(DB_TABLES.profiles)
    .update({ ...user, updated_at: dayjs.utc().format() })
    .eq("id", id);
}

export async function getProfile(id: string) {
  const { data } = await client
    .from<"profiles", Profile>(DB_TABLES.profiles)
    .select()
    .eq("id", id)
    .returns<Profile[]>();

  return data?.[0];
}

export async function listJammers(ids?: string[]) {
  const query = client
    .from(DB_TABLES.profiles)
    .select("*")
    .eq("user_type", "jammer");

  if (ids) {
    void query.in("id", ids);
  }

  const { data, error } = await query.returns<Profile[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

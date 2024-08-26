import dayjs from "dayjs";

import { DB_TABLES } from "@/constants/supabase/db.ts";
import client from "@/helpers/client.ts";
import { JammerReview } from "@/types/jammerReview.ts";

export async function createProjectJammerReview(
  data: Pick<
    JammerReview,
    "review_type" | "jammer_id" | "summary" | "user_id" | "project_id"
  >
) {
  const { data: response, error } = await client
    .from(DB_TABLES.jammerReviews)
    .insert(data)
    .select()
    .limit(1)
    .order("updated_at", { ascending: false })
    .single<JammerReview>();

  if (error) {
    throw new Error(error.message);
  }

  return response;
}

export async function updateProjectJammerReview(
  id: string,
  data: Partial<Pick<JammerReview, "review_type" | "summary">>
) {
  const { data: response, error } = await client
    .from(DB_TABLES.jammerReviews)
    .update({ ...data, updated_at: dayjs.utc().format() })
    .eq("id", id)
    .select()
    .limit(1)
    .order("updated_at", { ascending: false })
    .single<JammerReview>();

  if (error) {
    throw new Error(error.message);
  }

  return response;
}

export async function getProjectJammerReview(
  projectId: string,
  jammerId: string,
  userId: string
) {
  const { data, error } = await client
    .from(DB_TABLES.jammerReviews)
    .select("*")
    .match({ project_id: projectId, jammer_id: jammerId, user_id: userId })
    .limit(1)
    .single<JammerReview>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

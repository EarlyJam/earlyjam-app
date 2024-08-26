import { DB_TABLES } from "@/constants/supabase/db.ts";
import { ProjectDraft } from "@/types/projectDraft";

import client from "../client";

export async function createProjectDraft(draft: Partial<ProjectDraft>) {
  const { data, error } = await client
    .from(DB_TABLES.projectDrafts)
    .insert(draft)
    .select("*")
    .returns<ProjectDraft[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function listProjectDrafts(userId: string, page = 0, size = 10) {
  const range = [page * size, (page + 1) * size - 1] as const;
  const { data, error, count } = await client
    .from(DB_TABLES.projectDrafts)
    .select("*", { count: "exact", head: false })
    .match({ user_id: userId })
    .order("created_at", { ascending: false })
    .range(...range)
    .returns<ProjectDraft[]>();

  if (error) {
    throw new Error(error.message);
  }

  return { data, count, range };
}

export async function getProjectDraft(id: string) {
  const { data, error } = await client
    .from(DB_TABLES.projectDrafts)
    .select()
    .eq("id", id)
    .returns<ProjectDraft[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function deleteProjectDraft(id: string) {
  await client.from(DB_TABLES.projectDrafts).delete().eq("id", id);
}

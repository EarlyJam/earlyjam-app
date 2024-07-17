import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { DB_TABLES } from "@/constants/db";
import client from "@/helpers/client";
import { Project } from "@/types/project";

dayjs.extend(utc);

export async function getProject(id: string) {
  const { data } = await client
    .from(DB_TABLES.projects)
    .select()
    .eq("id", id)
    .returns<Project[]>();

  return data?.[0];
}

export async function createProject(
  project: Partial<Omit<Project, "id" | "created_at" | "updated_at">>,
) {
  const { data } = await client
    .from(DB_TABLES.projects)
    .insert({
      ...project,
      created_at: dayjs.utc().format(),
      updated_at: dayjs.utc().format(),
    })
    .select()
    .returns<Project[]>();

  return data?.[0];
}

export async function updateProject(
  id: string,
  project: Partial<Omit<Project, "id" | "created_at" | "updated_at">>,
) {
  await client
    .from(DB_TABLES.projects)
    .update({ ...project, updated_at: dayjs.utc().format() })
    .eq("id", id);
}

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { DB_TABLES } from "@/constants/db";
import client from "@/helpers/client";
import {
  JammerProjectList,
  Project,
  ProjectJammer,
  ProjectResponse,
} from "@/types/project";

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

export async function getJammerProjects(
  jammerId: string,
  page = 0,
  size = 10,
  filters: Partial<Pick<ProjectJammer, "status">> = {},
) {
  const range = [page * size, (page + 1) * size - 1] as const;
  const { data, error, count } = await client
    .from(DB_TABLES.projectJammer)
    .select(
      `
      id,
      project_id,
      jammer_id,
      status,
      created_at,
      updated_at,
      project: projects (
        id,
        user_id,
        product_name,
        product_type
      )
    `,
      { count: "exact" },
    )
    .match({ jammer_id: jammerId, ...filters })
    .range(...range)
    .returns<JammerProjectList>();

  if (error) {
    throw new Error(error.message);
  }

  return { data, count, range };
}

export async function getProjectJammer(jammerId: string, projectId: string) {
  const { data, error } = await client
    .from(DB_TABLES.projectJammer)
    .select("*")
    .match({ jammer_id: jammerId, project_id: projectId })
    .returns<ProjectJammer[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function updateProjectJammer(
  projectId: string,
  userId: string,
  data: Partial<Omit<ProjectJammer, "id" | "created_at" | "updated_at">>,
) {
  await client
    .from(DB_TABLES.projectJammer)
    .update({ ...data, updated_at: dayjs.utc().format() })
    .eq("project_id", projectId)
    .eq("jammer_id", userId);
}

export async function createProjectResponse(
  projectId: string,
  jammerId: string,
  data: Pick<ProjectResponse, "summary" | "additional_links" | "video_link">,
) {
  const response = await client
    .from(DB_TABLES.projectResponses)
    .insert({
      project_id: projectId,
      jammer_id: jammerId,
      ...data,
      created_at: dayjs.utc().format(),
      updated_at: dayjs.utc().format(),
    })
    .select()
    .returns<ProjectResponse[]>();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
}

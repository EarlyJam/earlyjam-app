import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { DB_TABLES } from "@/constants/supabase/db.ts";
import client from "@/helpers/client";
import {
  JammerProjectList,
  Project,
  ProjectJammer,
  ProjectJammerList,
  ProjectJammerListItem,
  ProjectList,
  ProjectResponse
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
  project: Partial<Omit<Project, "id" | "created_at" | "updated_at">>
) {
  const { data } = await client
    .from(DB_TABLES.projects)
    .insert({
      ...project,
      created_at: dayjs.utc().format(),
      updated_at: dayjs.utc().format()
    })
    .select()
    .returns<Project[]>();

  return data?.[0];
}

export async function updateProject(
  id: string,
  project: Partial<Omit<Project, "id" | "created_at" | "updated_at">>
) {
  await client
    .from(DB_TABLES.projects)
    .update({ ...project, updated_at: dayjs.utc().format() })
    .eq("id", id);
}

export async function deleteProject(id: string) {
  await client.from(DB_TABLES.projects).delete().eq("id", id);
}

export async function deleteProjectJammers(projectId: string) {
  await client
    .from(DB_TABLES.projectJammer)
    .delete()
    .eq("project_id", projectId);
}

export async function getJammerProjects(
  jammerId: string,
  page = 0,
  size = 10,
  filters: Partial<Pick<ProjectJammer, "status">> = {}
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
      { count: "exact" }
    )
    .match({ jammer_id: jammerId, ...filters })
    .order("created_at", { ascending: false })
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
    .select(
      `
        id,
        project_id,
        jammer_id,
        status,
        created_at,
        updated_at,
        profile: profiles (
          id,
          first_name,
          last_name,
          profile_image,
          email
        )
      `
    )
    .match({ jammer_id: jammerId, project_id: projectId })
    .returns<ProjectJammerListItem[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function getProjectJammers(
  projectId: string,
  filters: Partial<Pick<ProjectJammer, "status">> = {}
) {
  const { data, error } = await client
    .from(DB_TABLES.projectJammer)
    .select(
      `
        id,
        project_id,
        jammer_id,
        status,
        created_at,
        updated_at,
        profile: profiles (
          id,
          first_name,
          last_name,
          profile_image,
          email
        )
      `
    )
    .match({ project_id: projectId, ...filters })
    .order("created_at", { ascending: false })
    .returns<ProjectJammerList>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProjectJammer(
  projectId: string,
  userId: string,
  data: Partial<Omit<ProjectJammer, "id" | "created_at" | "updated_at">>
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
  data: Pick<ProjectResponse, "summary" | "additional_links" | "video_link">
) {
  const response = await client
    .from(DB_TABLES.projectResponses)
    .insert({
      project_id: projectId,
      jammer_id: jammerId,
      ...data,
      created_at: dayjs.utc().format(),
      updated_at: dayjs.utc().format()
    })
    .select()
    .returns<ProjectResponse[]>();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
}

export async function getProjectResponses(projectId: string) {
  const { data, error } = await client
    .from(DB_TABLES.projectResponses)
    .select("*")
    .match({ project_id: projectId })
    .returns<ProjectResponse[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getProjectJammerResponse(
  projectId: string,
  jammerId: string
) {
  const { data, error } = await client
    .from(DB_TABLES.projectResponses)
    .select("*")
    .match({ project_id: projectId, jammer_id: jammerId })
    .limit(1)
    .single<ProjectResponse>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getClientProjects(
  userId: string,
  page = 0,
  size = 10,
  filters: Partial<Pick<Project, "status">> = {}
) {
  const statuses = filters.status ? [filters.status] : [];
  if (filters.status === "accepted") {
    statuses.push("design_implementation");
  }
  const range = [page * size, (page + 1) * size - 1] as const;
  const { data, error, count } = await client
    .from(DB_TABLES.projects)
    .select(
      `
      id,
      user_id,
      product_name,
      product_description,
      product_problem_statement,
      product_type,
      product_industry,
      feedback_feature,
      designer_critique_aspects,
      feedback_aspects,
      feedback_goals,
      project_link,
      project_images,
      status,
      created_at,
      updated_at,
      jammers: project_jammer (
        id,
        project_id,
        jammer_id,
        status,
        created_at,
        updated_at,
        profile: profiles (
          id,
          first_name,
          last_name,
          profile_image,
          email
        )
      )
    `,
      { count: "exact", head: false }
    )
    .match({ user_id: userId })
    .in("status", statuses)
    .order("created_at", { ascending: false })
    .range(...range)
    .returns<ProjectList>();

  if (error) {
    throw new Error(error.message);
  }

  return { data, count, range };
}

export async function createProjectJammers(
  projectId: string,
  userIds: string[]
) {
  const data = userIds.map(
    (userId) =>
      ({
        project_id: projectId,
        jammer_id: userId,
        status: "awaiting_response",
        created_at: dayjs.utc().format(),
        updated_at: dayjs.utc().format()
      }) as Omit<ProjectJammer, "id">
  );
  await client.from(DB_TABLES.projectJammer).insert(data);
}

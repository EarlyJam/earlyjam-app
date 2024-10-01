import { DB_TABLES } from "@/constants/supabase/db.ts";
import client from "@/helpers/client.ts";
import dayjs from "@/helpers/dayjs.ts";
import { Project } from "@/types/project.ts";
import { UpsellRequest } from "@/types/upsellRequest.ts";

export async function createUpsellRequest(
  data: Partial<Omit<UpsellRequest, "id" | "created_at" | "updated_at">>
) {
  const { data: response, error } = await client
    .from(DB_TABLES.upsellRequests)
    .insert({
      ...data,
      created_at: dayjs.utc().format(),
      updated_at: dayjs.utc().format()
    })
    .select()
    .single<UpsellRequest>();

  if (error) {
    throw new Error(error.message);
  }

  return response;
}

export async function getUpsellRequest(id: string) {
  const { data, error } = await client
    .from(DB_TABLES.upsellRequests)
    .select(
      `
      id,
      project_id,
      jammers,
      status,
      description,
      created_at,
      updated_at,
      project: projects (
        id,
        user_id,
        product_name,
        product_type
      )
    `
    )
    .eq("id", id)
    .limit(1)
    .single<
      UpsellRequest & {
        project: Pick<
          Project,
          "id" | "user_id" | "product_name" | "product_type" | "status"
        >;
      }
    >();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUpsellRequests(projectId: string) {
  const { data, error } = await client
    .from(DB_TABLES.upsellRequests)
    .select("*")
    .match({ project_id: projectId })
    .returns<UpsellRequest[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateUpsellRequest(
  id: number,
  data: Partial<Omit<UpsellRequest, "id" | "created_at" | "updated_at">>
) {
  await client
    .from(DB_TABLES.upsellRequests)
    .update({ ...data, updated_at: dayjs.utc().format() })
    .eq("id", id);
}

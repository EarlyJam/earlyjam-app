import dayjs from "dayjs";

import { DB_TABLES } from "@/constants/supabase/db.ts";
import client from "@/helpers/client.ts";
import { ProjectPayment } from "@/types/projectPayment.ts";

export async function createProjectPayment(
  data: Pick<ProjectPayment, "project_id" | "jammers" | "amount" | "status">
) {
  const response = await client
    .from(DB_TABLES.projectPayments)
    .insert(data)
    .select("*")
    .returns<ProjectPayment[]>();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data[0];
}

export async function updateProjectPayment(data: {
  id: number;
  data: Pick<ProjectPayment, "status">;
}) {
  await client
    .from(DB_TABLES.projectPayments)
    .update({ ...data.data, updated_at: dayjs.utc().format() })
    .eq("id", data.id);
}

export async function getProjectPayment(id: string | number) {
  const response = await client
    .from(DB_TABLES.projectPayments)
    .select("*")
    .eq("id", id)
    .limit(1)
    .single<ProjectPayment>();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

export async function listProjectPayments() {
  const response = await client
    .from(DB_TABLES.projectPayments)
    .select("*")
    .returns<ProjectPayment[]>();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
}

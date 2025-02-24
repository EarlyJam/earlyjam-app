import { DB_TABLES } from "@/constants/supabase/db.ts";
import client from "@/helpers/client";
import { Markup, MarkupFile } from "@/types/markup";

export async function createMarkupFile(
  newMarkupFile: MarkupFile[]
): Promise<MarkupFile[]> {
  const { data, error } = await client
    .from(DB_TABLES.markupFiles)
    .insert(newMarkupFile)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data as MarkupFile[];
}

export async function createMarkup(newMarkup: Markup): Promise<Markup[]> {
  const { data, error } = await client
    .from(DB_TABLES.markups)
    .insert(newMarkup)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data as Markup[];
}

export async function getMarkups(user_id: string): Promise<Markup[]> {
  const { data, error } = await client
    .from(DB_TABLES.markups)
    .select()
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return data as Markup[];
}

export async function getMarkup(id: string) {
  const { data, error } = await client
    .from(DB_TABLES.markups)
    .select()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Markup | undefined;
}

import config from "@/config";
import client from "@/helpers/client";

const mediaBucket = client.storage.from(config.MEDIA_STORAGE_BUCKET);

export async function uploadFile(key: string, file: File) {
  const { data, error } = await mediaBucket.upload(key, file);

  if (error) {
    throw error;
  }

  return data;
}

export function getPublicUrl(key: string) {
  const { data } = mediaBucket.getPublicUrl(key);

  return data;
}

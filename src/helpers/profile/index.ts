import { Profile } from "@/types/profile";

export function getProfileFullName(profile?: Partial<Profile>) {
  if (!profile) {
    return "";
  }

  return `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim();
}

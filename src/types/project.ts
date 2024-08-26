import { Profile } from "./profile";

export type ProjectStatus =
  | "awaiting_response"
  | "accepted"
  | "rejected"
  | "closed"
  | "completed";

export type Project = {
  id: string;
  user_id: string;
  product_name: string;
  product_description?: string;
  product_problem_statement?: string;
  product_type?: string;
  product_industry?: string[];
  feedback_feature?: string;
  designer_critique_aspects?: string;
  feedback_aspects?: string[];
  feedback_goals?: string[];
  project_link?: { url: string }[];
  project_images?: {
    id: string;
    name: string;
    url: string;
  }[];
  status?: ProjectStatus;
  created_at: string;
  updated_at: string;
};

export type ProjectJammer = {
  id: string;
  project_id: string;
  jammer_id: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
};

export type ProjectResponse = {
  id: string;
  project_id: string;
  jammer_id: string;
  summary: string;
  additional_links?: string[];
  video_link?: string;
  loom_video_id?: string;
  loom_video_duration?: number;
  created_at: string;
  updated_at: string;
};

export type JammerProjectListItem = Pick<
  ProjectJammer,
  "id" | "project_id" | "jammer_id" | "status" | "created_at" | "updated_at"
> & {
  project: Pick<
    Project,
    "id" | "user_id" | "product_name" | "product_type" | "status"
  >;
};

export type JammerProjectList = JammerProjectListItem[];

export type ProjectList = (Project & {
  jammers: (ProjectJammer & {
    profile: Pick<
      Profile,
      "id" | "first_name" | "last_name" | "profile_image" | "email"
    >;
  })[];
})[];

export type ProjectJammerListItem = ProjectJammer & {
  profile: Pick<
    Profile,
    "id" | "first_name" | "last_name" | "profile_image" | "email"
  >;
};

export type ProjectJammerList = ProjectJammerListItem[];

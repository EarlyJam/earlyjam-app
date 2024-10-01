import { Project } from "@/types/project.ts";

export type UpsellRequest = {
  id: number;
  project_id: string;
  jammers: string[];
  description?: string;
  status: "pending" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
  project?: Pick<
    Project,
    "id" | "user_id" | "product_name" | "product_type" | "status"
  >;
};

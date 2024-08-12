import { Project } from "./project";

export type ProjectDraft = Partial<Omit<Project, "status" | "id">> & {
  id: string;
};

import {
  getProject,
  getProjectJammers,
  updateProject
} from "@/helpers/db/project";
import { ProjectStatus } from "@/types/project";

export function getProjectStatusLabel(status?: ProjectStatus | "draft") {
  switch (status) {
    case "awaiting_response":
      return "Waiting for Jammer";
    case "accepted":
      return "In Progress";
    case "rejected":
      return "Rejected";
    case "closed":
      return "Closed";
    case "draft":
      return "Draft";
    default:
      return "Unknown";
  }
}

export async function updateProjectStatus(projectId: string) {
  const jammers = await getProjectJammers(projectId);
  if (jammers.length === 0) {
    return;
  }

  const project = await getProject(projectId);

  if (!project) return;

  let status = project.status;

  if (jammers.some((jammer) => jammer.status === "accepted")) {
    status = "accepted";
  } else if (jammers.every((jammer) => jammer.status === "rejected")) {
    status = "closed";
  } else if (jammers.every((jammer) => jammer.status === "closed")) {
    status = "closed";
  } else if (jammers.every((jammer) => jammer.status === "awaiting_response")) {
    status = "awaiting_response";
  } else if (jammers.every((jammer) => jammer.status === "completed")) {
    status = "closed";
  }

  if (status !== project.status) {
    await updateProject(projectId, { status });
  }
}

import { Project } from "@/types/project";

export function getProjectStatusLabel(status?: Project["status"]) {
  switch (status) {
    case "awaiting_response":
      return "Waiting for Jammer";
    case "accepted":
      return "In Progress";
    case "rejected":
      return "Rejected";
    case "closed":
      return "Closed";
    default:
      return "Unknown";
  }
}

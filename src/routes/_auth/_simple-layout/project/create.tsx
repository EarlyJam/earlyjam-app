import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import ProjectForm from "@/components/page-components/CreateProject/ProjectForm";
import RequestSubmitted from "@/components/page-components/CreateProject/RequestSubmitted";

export const Route = createFileRoute("/_auth/_simple-layout/project/create")({
  validateSearch: z.object({
    step: z.string().optional()
  }),
  component: ProjectCreate
});

function ProjectCreate() {
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [projectId, setProjectId] = useState<string>();

  if (requestSubmitted && projectId) {
    return <RequestSubmitted projectId={projectId} />;
  }

  return (
    <ProjectForm
      onSubmitDone={(id) => {
        setRequestSubmitted(true);
        setProjectId(id);
      }}
    />
  );
}

import { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import ProjectForm from "@/components/page-components/CreateProject/ProjectForm";
import RequestSubmitted from "@/components/page-components/CreateProject/RequestSubmitted";
import useProjectDraft from "@/hooks/queries/useProjectDraft";

export const Route = createFileRoute(
  "/_auth/_simple-layout/project/draft/$id/edit"
)({
  component: DraftEdit
});

function DraftEdit() {
  const { $id } = Route.useParams();

  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [projectId, setProjectId] = useState<string>();

  const { data: projectDraft } = useProjectDraft($id);

  if (requestSubmitted && projectId) {
    return <RequestSubmitted projectId={projectId} />;
  }

  return (
    <ProjectForm
      project={{
        ...projectDraft,
        id: undefined,
        created_at: undefined,
        updated_at: undefined
      }}
      mode="draft"
      draftId={$id}
      onSubmitDone={(id) => {
        setRequestSubmitted(true);
        setProjectId(id);
      }}
    />
  );
}

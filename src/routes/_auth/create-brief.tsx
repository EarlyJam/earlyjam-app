import BriefForm from "@/components/page-components/CreateBrief/BriefForm";
import Header from "@/components/page-components/CreateBrief/Header";
import RequestSubmitted from "@/components/page-components/CreateBrief/RequestSubmitted";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_auth/create-brief")({
  component: CreateBrief,
});

function CreateBrief() {
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  return (
    <div className="h-full flex flex-col mx-5">
      <Header />
      {requestSubmitted ? (
        <RequestSubmitted />
      ) : (
        <BriefForm onSubmitDone={() => setRequestSubmitted(true)} />
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/jammer")({
  component: () => <div>Hello /signup/jammer!</div>,
});

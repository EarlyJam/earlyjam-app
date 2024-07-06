import { Button } from "@/components/ui/button";
import { logout } from "@/helpers/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    await navigate({ to: "/login" });
  };

  return (
    <div className="p-2">
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
      <hr className="my-6" />
      <h3>Dashboard!</h3>
    </div>
  );
}

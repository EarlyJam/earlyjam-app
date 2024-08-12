import { useNavigate } from "@tanstack/react-router";
import { LuArrowUpLeft } from "react-icons/lu";

type BackLinkProps = {
  to: string;
  params?: Record<string, string | number>;
};

function BackLink(props: BackLinkProps) {
  const { to, params } = props;

  const navigate = useNavigate();

  return (
    <div
      className="flex w-fit cursor-pointer flex-row items-center gap-2 border-b border-blue-secondary-dark"
      onClick={() => {
        void navigate({ to, params });
      }}
    >
      <LuArrowUpLeft className="h-4.5 w-4.5 text-blue-secondary-dark" />
      <p className="text-sm font-semibold leading-4.5">Back</p>
    </div>
  );
}

export default BackLink;

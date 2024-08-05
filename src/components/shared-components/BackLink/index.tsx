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
      className="w-fit flex flex-row gap-2 items-center border-b border-blue-secondary-dark cursor-pointer"
      onClick={() => {
        void navigate({ to, params });
      }}
    >
      <LuArrowUpLeft className="w-4.5 h-4.5 text-blue-secondary-dark" />
      <p className="text-sm leading-4.5 font-semibold">Back</p>
    </div>
  );
}

export default BackLink;

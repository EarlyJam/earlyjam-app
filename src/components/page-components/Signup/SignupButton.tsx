import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { FC } from "react";

interface SignupButtonProps {
  selectedType: "client" | "jammer" | null;
}

const BUTTON_TEXT = {
  client: "Join as a client",
  jammer: "Apply to be a Jammer",
  null: "Create Account",
};

const SignupButton: FC<SignupButtonProps> = (props) => {
  const { selectedType } = props;
  return (
    <Link to={`/signup/${selectedType ?? ""}`}>
      <Button
        disabled={selectedType === null}
        className={clsx(
          "rounded-full py-2.5 px-7 text-base font-semibold leading-5",
          {
            "bg-gray-300 text-gray-400-disable": selectedType === null,
          },
        )}
      >
        {BUTTON_TEXT[selectedType ?? "null"]}&nbsp;
        <ArrowRight className="ml-2" width={20} />
      </Button>
    </Link>
  );
};

export default SignupButton;

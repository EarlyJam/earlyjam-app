import Button from "@/components/shared-components/Button";
import { UserType } from "@/enums/user";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FC } from "react";

const SIGNUP_BUTTON_TEXT = {
  client: "Join as a client",
  jammer: "Apply to be a Jammer",
  null: "Create Account",
};

type SignupButtonProps = {
  selectedType: UserType | null;
};

const SignupButton: FC<SignupButtonProps> = (props) => {
  const { selectedType } = props;
  return (
    <Link to={`/signup/${selectedType ?? ""}`}>
      <Button disabled={selectedType === null}>
        {SIGNUP_BUTTON_TEXT[selectedType ?? "null"]}&nbsp;
        <ArrowRight className="ml-2" width={20} />
      </Button>
    </Link>
  );
};

export default SignupButton;

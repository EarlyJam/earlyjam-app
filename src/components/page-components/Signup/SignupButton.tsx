import Button from "@/components/shared-components/Button";
import { UserType } from "@/enums/user";
import { Link } from "@tanstack/react-router";
import { FC } from "react";
import { LuArrowRight } from "react-icons/lu";

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
      <Button
        disabled={selectedType === null}
        endIcon={<LuArrowRight width={20} />}
      >
        {SIGNUP_BUTTON_TEXT[selectedType ?? "null"]}
      </Button>
    </Link>
  );
};

export default SignupButton;

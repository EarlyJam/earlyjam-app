import { FC } from "react";

import { Link } from "@tanstack/react-router";
import { LuArrowRight } from "react-icons/lu";

import Button from "@/components/shared-components/Button";
import { UserType } from "@/enums/user";

const SIGNUP_BUTTON_TEXT = {
  client: "Join as a client",
  jammer: "Apply to be a Jammer",
  super_admin: "",
  null: "Create Account"
};

type SignupButtonProps = {
  selectedType: UserType.Client | UserType.Jammer | null;
};

const SignupButton: FC<SignupButtonProps> = (props) => {
  const { selectedType } = props;
  return (
    <Link to={`/signup/${selectedType ?? "client"}`}>
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

import { FC } from "react";
import { Link } from "@tanstack/react-router";
import { LuArrowRight } from "react-icons/lu";
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
  const disabled = selectedType === null;
  const active = !disabled;
  const button = (
    <button
      type="button"
      disabled={disabled}
      className={`
        ${active ? "bg-[#7AD38E] text-[#051D56]" : "bg-[#eaecf0] text-[#d0d5dd]"}
        font-gilroy font-semibold text-[16px] leading-5
        rounded-[22px]
        px-7 py-2.5
        flex flex-row items-center gap-2
        mb-2
        transition-colors transition-all duration-200
        w-full sm:w-auto
        hover:bg-[#A6E2B4] hover:[#051D56]
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
      `}
    >
      {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-unnecessary-condition */}
      {SIGNUP_BUTTON_TEXT[selectedType === null ? "null" : selectedType]}
      <LuArrowRight className={`w-[18px] h-[18px] ${active ? "text-[#051D56]" : "text-[#d0d5dd]"}`} />
    </button>
  );
  if (disabled) return button;
  return (
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing, @typescript-eslint/no-unnecessary-condition
    <Link to={`/signup/${selectedType === null ? "client" : selectedType}`}>{button}</Link>
  );
};

export default SignupButton;

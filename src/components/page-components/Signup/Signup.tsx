import { Link } from "@tanstack/react-router";

import LogoFull from "@/assets/svgs/LogoFull";
import SignupForm from "@/components/page-components/Signup/SignupForm";
import { UserType } from "@/enums/user";

const SIGNUP_COPY = {
  client: {
    title: "Sign up for insights from world class designers.",
    headerText: "Looking for work?",
    headerSubText: "Apply as a designer"
  },
  jammer: {
    title: "Sign up to start sharing design feedback.",
    headerText: "Want design feedback?",
    headerSubText: "Join as a client"
  },
  super_admin: {
    title: "",
    headerText: "",
    headerSubText: ""
  }
};

type SignupProps = {
  type: UserType;
  onDone(email: string): void;
};

function Signup(props: SignupProps) {
  const { type = UserType.Client, onDone } = props;

  return (
    <div className="flex h-screen w-screen flex-col-reverse overflow-auto sm:flex-row">
      <div className="relative h-full w-full sm:w-fit">
        <img
          src="/assets/images/signup_info_background.jpeg"
          alt="signup-banner"
          className="h-[524px] w-full object-cover sm:h-full sm:w-[unset] sm:max-w-[800px]"
          loading="lazy"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-blue-secondary-dark/90 opacity-80">
          <img
            src="/assets/images/signup_banner_text.png"
            className="hidden sm:block"
            loading="lazy"
          />
          <img
            src="/assets/images/signup_banner_text_sm.png"
            className="block sm:hidden"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center bg-white sm:overflow-auto">
        <div className="w-full max-w-[410px] px-5 py-14 sm:px-0 sm:py-0">
          <div className="mb-12 flex flex-row items-center justify-between">
            <LogoFull />
            <div className="text-end">
              <p className="text-sm text-gray-600-secondary">
                {SIGNUP_COPY[type].headerText}
              </p>
              <Link
                to={`/signup/${type === UserType.Jammer ? "client" : "jammer"}`}
                className="text-sm font-semibold text-blue-primary-500"
              >
                {SIGNUP_COPY[type].headerSubText}
              </Link>
            </div>
          </div>
          <h2 className="mb-8 font-fraunces text-4xl leading-11 text-blue-secondary-dark">
            {SIGNUP_COPY[type].title}
          </h2>
          <SignupForm type={type} onDone={onDone} />
        </div>
      </div>
    </div>
  );
}

export default Signup;

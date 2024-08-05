import LogoFull from "@/assets/svgs/LogoFull";
import SignupForm from "@/components/page-components/Signup/SignupForm";
import { UserType } from "@/enums/user";
import { Link } from "@tanstack/react-router";

const SIGNUP_COPY = {
  client: {
    title: "Sign up for insights from world class designers.",
    headerText: "Looking for work?",
    headerSubText: "Apply as a designer",
  },
  jammer: {
    title: "Sign up to start sharing design feedback.",
    headerText: "Want design feedback?",
    headerSubText: "Join as a client",
  },
};

type SignupProps = {
  type: UserType;
  onDone(email: string): void;
};

function Signup(props: SignupProps) {
  const { type = UserType.Client, onDone } = props;

  return (
    <div className="w-screen h-screen flex flex-col-reverse sm:flex-row overflow-auto">
      <div className="h-full w-full sm:w-fit relative">
        <img
          src="/assets/images/signup_info_background.jpeg"
          alt="signup-banner"
          className="sm:w-[unset] w-full h-[524px] sm:max-w-[800px] sm:h-full object-cover"
          loading="lazy"
        />
        <div className="absolute w-full h-full top-0 left-0 bg-blue-secondary-dark/90 opacity-80 flex justify-center items-center">
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
      <div className="w-full h-full bg-white flex justify-center items-center sm:overflow-auto">
        <div className="max-w-[410px] w-full py-14 sm:py-0 px-5 sm:px-0">
          <div className="flex flex-row justify-between items-center mb-12">
            <LogoFull />
            <div className="text-end">
              <p className="text-sm text-gray-600-secondary">
                {SIGNUP_COPY[type].headerText}
              </p>
              <Link
                to={`/signup/${type === UserType.Jammer ? "client" : "jammer"}`}
                className="text-sm text-blue-primary-500 font-semibold"
              >
                {SIGNUP_COPY[type].headerSubText}
              </Link>
            </div>
          </div>
          <h2 className="font-fraunces text-4xl leading-11 text-blue-secondary-dark mb-8">
            {SIGNUP_COPY[type].title}
          </h2>
          <SignupForm type={type} onDone={onDone} />
        </div>
      </div>
    </div>
  );
}

export default Signup;

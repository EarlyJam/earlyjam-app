import { Link } from "@tanstack/react-router";

import LogoFull from "@/assets/svgs/LogoFull";
import SignupForm from "@/components/page-components/Signup/SignupForm";
import Heading2 from "@/components/ui/heading2.tsx";
import Heading5 from "@/components/ui/heading5.tsx";
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

type BannerInfoBlockProps = {
  count: number;
  title: string;
  description: string;
};

function BannerInfoBlock(props: BannerInfoBlockProps) {
  const { count, title, description } = props;

  return (
    <div className="flex flex-row items-start gap-x-6">
      <div className="rounded-full border-6 border-primary/20">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/60">
          <Heading5 className="h-5 font-black text-white">{count}</Heading5>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <p className="text-lg font-semibold leading-6 text-white">{title}</p>
        <p className="leading-5.5 text-white">{description}</p>
      </div>
    </div>
  );
}

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
          src="https://nlsfcybznfjmowradcom.supabase.co/storage/v1/object/public/earlyjam-media/singup_info_background.jpeg"
          alt="signup-banner"
          className="h-[524px] w-full object-cover sm:h-full sm:w-[unset] sm:max-w-[800px]"
          loading="lazy"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-blue-secondary-dark/90 opacity-80">
          <div className="mx-5 flex flex-col gap-y-7 sm:mx-28">
            <div>
              <Heading2 className="text-2.5xl leading-8 text-green-500 sm:text-4xl sm:leading-11">
                Ready to become a Jammer?
              </Heading2>
              <Heading2 className="text-2.5xl leading-8 text-green-500 sm:text-4xl sm:leading-11">
                Here’s the breakdown:
              </Heading2>
            </div>
            <BannerInfoBlock
              count={1}
              title="Create an account on EarlyJam"
              description="Sign up to EarlyJam."
            />
            <BannerInfoBlock
              count={2}
              title="Apply to join as a Jammer"
              description="Share a few details on your experience."
            />
            <BannerInfoBlock
              count={3}
              title="Get approved and begin answering design briefs"
              description="Start responding to briefs and earning money for your design critique!"
            />
          </div>
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

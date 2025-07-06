import { Link } from "@tanstack/react-router";

import LogoFull from "@/assets/svgs/LogoFull";
import SignupForm from "@/components/page-components/Signup/SignupForm";
import { UserType } from "@/enums/user";

const SIGNUP_COPY = {
  client: {
    title: "Sign up for insights from world class designers.",
  },
  jammer: {
    title: "Sign up to start earning from design feedback",
  },
  super_admin: {
    title: "",
    subtitle: "",
  },
};

type SignupProps = {
  type: UserType;
  onDone(email: string): void;
};

function Signup(props: SignupProps) {
  const { type = UserType.Client, onDone } = props;

  return (
    <div className="flex flex-col-reverse sm:flex-row min-h-screen w-full overflow-auto">
      {/* Left: Illustration and copy */}
      <div className="flex-1 w-full bg-[#1A2851] flex flex-col items-center justify-center min-h-[50vh] pt-8 pb-8 px-4 sm:px-16">
        <div className="flex flex-col items-start justify-center gap-10">
          {type === UserType.Jammer ? (
            <>
              <h1 className="font-fraunces text-[2.25rem] sm:text-[2.00rem] leading-tight text-[#7AD38E] font-regular mb-6">
                Want to earn from your UX expertise?<br />Here&apos;s how to become a Jammer:
              </h1>
              <ol className="flex flex-col gap-8 w-full">
                <li className="flex flex-row items-start gap-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7AD38E]/80 flex items-center justify-center text-xl font-bold text-white font-gilroy shadow-md border-4 border-[#2B3860]" style={{lineHeight: '2.5rem'}}>1</span>
                  <div>
                    <div className="font-gilroy font-semibold text-white text-[20px] leading-[28px] mb-1">Sign up to EarlyJam</div>
                    <div className="font-gilroy text-white text-[16px] leading-[24px]">Create your profile and step into a growing network of design-led builders and thinkers.</div>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7AD38E]/80 flex items-center justify-center text-xl font-bold text-white font-gilroy shadow-md border-4 border-[#2B3860]" style={{lineHeight: '2.5rem'}}>2</span>
                  <div>
                    <div className="font-gilroy font-semibold text-white text-[20px] leading-[28px] mb-1">Apply to join the Jammer crew</div>
                    <div className="font-gilroy text-white text-[16px] leading-[24px]">Tell us a bit about your experience. We&apos;re looking for thoughtful, experienced designers who love helping others level up.</div>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7AD38E]/80 flex items-center justify-center text-xl font-bold text-white font-gilroy shadow-md border-4 border-[#2B3860]" style={{lineHeight: '2.5rem'}}>3</span>
                  <div>
                    <div className="font-gilroy font-semibold text-white text-[20px] leading-[28px] mb-1">Get approved. Start earning.</div>
                    <div className="font-gilroy text-white text-[16px] leading-[24px]">Once you&apos;re in, you&apos;ll get access to design briefs and start earning for sharing your expert insights.</div>
                  </div>
                </li>
              </ol>
            </>
          ) : (
            <>
              <h1 className="font-fraunces text-[2.25rem] sm:text-[2.00rem] leading-tight text-[#7AD38E] font-regular mb-6">
                Ready for expert UX feedback? <br />Here&apos;s how it works:
              </h1>
              <ol className="flex flex-col gap-8 w-full">
                <li className="flex flex-row items-start gap-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7AD38E]/80 flex items-center justify-center text-xl font-bold text-white font-gilroy shadow-md border-4 border-[#2B3860]" style={{lineHeight: '2.5rem'}}>1</span>
                  <div>
                    <div className="font-gilroy font-semibold text-white text-[20px] leading-[28px] mb-1">Join EarlyJam</div>
                    <div className="font-gilroy text-white text-[16px] leading-[24px]">Create a free account and step into a community of makers and product obsessives.</div>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7AD38E]/80 flex items-center justify-center text-xl font-bold text-white font-gilroy shadow-md border-4 border-[#2B3860]" style={{lineHeight: '2.5rem'}}>2</span>
                  <div>
                    <div className="font-gilroy font-semibold text-white text-[20px] leading-[28px] mb-1">Share your work</div>
                    <div className="font-gilroy text-white text-[16px] leading-[24px]">Upload your product flows, prototypes, or vibes-in-progress. Whether it&apos;s for your startup or a side hustle, we&apos;re here for it.</div>
                  </div>
                </li>
                <li className="flex flex-row items-start gap-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#7AD38E]/80 flex items-center justify-center text-xl font-bold text-white font-gilroy shadow-md border-4 border-[#2B3860]" style={{lineHeight: '2.5rem'}}>3</span>
                  <div>
                    <div className="font-gilroy font-semibold text-white text-[20px] leading-[28px] mb-1">Get sharp, senior-level feedback</div>
                    <div className="font-gilroy text-white text-[16px] leading-[24px]">Receive clear, actionable feedback from top-tier UX designers — so you can craft smarter, more intuitive experiences and convert like never before.</div>
                  </div>
                </li>
              </ol>
            </>
          )}
        </div>
      </div>
      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center bg-white min-h-[50vh] pt-8 pb-8 px-4 sm:px-16 sm:w-1/2 sm:overflow-auto">
        <div className="w-full max-w-[410px]">
          <div className="mb-12 flex flex-row items-center justify-between">
            <a href="https://www.earlyjam.com">
              <LogoFull />
            </a>
            <div className="flex flex-col items-end ml-4">
              {type === UserType.Jammer ? (
                <>
                  <span className="text-sm text-gray-600-secondary mb-1">Want design feedback?</span>
                  <Link
                    to="/signup/client"
                    className="text-sm font-semibold text-blue-primary-500 hover:underline focus:underline px-0 py-0 rounded-none transition-colors"
                    style={{ boxShadow: "none", border: "none", background: "none" }}
                  >
                    Join as a client
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-sm text-gray-600-secondary mb-1">Looking for work?</span>
                  <Link
                    to="/signup/jammer"
                    className="text-sm font-semibold text-blue-primary-500 hover:underline focus:underline px-0 py-0 rounded-none transition-colors"
                    style={{ boxShadow: "none", border: "none", background: "none" }}
                  >
                    Apply as a designer
                  </Link>
                </>
              )}
            </div>
          </div>
          <h2 className="mb-4 font-fraunces text-3xl sm:text-4xl leading-10 text-blue-secondary-dark">
            {SIGNUP_COPY[type].title}
          </h2>
          <SignupForm type={type} onDone={onDone} />
        </div>
      </div>
    </div>
  );
}

export default Signup;

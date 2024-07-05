import BannerText from "@/assets/images/signup_banner_text.png";
import BannerTextSm from "@/assets/images/signup_banner_text_sm.png";
import LogoFull from "@/assets/svgs/LogoFull";
import SignupForm from "@/components/page-components/Signup/SignupForm";
import { Link } from "@tanstack/react-router";
import { FC } from "react";

interface SignupProps {
  onDone(): void;
}

const Signup: FC<SignupProps> = (props) => {
  const { onDone } = props;

  return (
    <div className="w-screen h-screen flex flex-col-reverse sm:flex-row overflow-auto">
      <div className="h-full w-full sm:w-fit relative">
        <img
          src="https://s3-alpha-sig.figma.com/img/470b/4b0d/29d6c3d90fe71ed4f942133855e283a3?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U7IgqGSywmkdZxvDG~tZI9RpJSOifJK8f59giEZNfhps7jbXo5d~HkqeZ7JPbMBcDKKyMqBQrnY3Si4GJ57rTQ3NJkR9pY6V9UvYtOthGoqiZ7pSptR7uRIV3ltYnN9uo-DrH~9kPt8kVT6miRzdzianGvsKKl2jJfd~7BGIytL1wPQDvEj9NZGopRBrbnMhLCwDkt02hEeVpx7zbwCVecsV5WP7jebtMPmiKKg9FhRgCicU~I~yJuqKFyYe0KEIfgITQfmSVkPEpHE2avsFTAYgA79B4Y40ZUuXcqPH9iK4x~8V2hQOIkuIGLVntnLY2CauWcZnbQoCtoTiiKInEA__"
          alt="signup-banner"
          className="sm:w-[unset] w-full h-[524px] sm:max-w-[800px] sm:h-full object-cover"
        />
        <div className="absolute w-full h-full top-0 left-0 bg-blue-secondary-dark/90 opacity-80 flex justify-center items-center">
          <img src={BannerText} className="hidden sm:block" />
          <img src={BannerTextSm} className="block sm:hidden" />
        </div>
      </div>
      <div className="w-full h-full bg-white flex justify-center items-center sm:overflow-auto">
        <div className="max-w-[410px] w-full py-14 sm:py-0 px-5 sm:px-0">
          <div className="flex flex-row justify-between items-center mb-12">
            <LogoFull />
            <div className="text-end">
              <p className="text-sm text-gray-600-secondary">
                Want design feedback?
              </p>
              <Link
                to="/signup/jammer"
                className="text-sm text-blue-primary-500 font-semibold"
              >
                Apply as a designer
              </Link>
            </div>
          </div>
          <h2 className="font-fraunces text-4xl leading-11 text-blue-secondary-dark mb-8">
            Sign up for insights from world class designers.
          </h2>
          <SignupForm onDone={onDone} />
        </div>
      </div>
    </div>
  );
};

export default Signup;

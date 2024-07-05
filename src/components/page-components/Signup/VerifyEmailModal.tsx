import LogoFull from "@/assets/svgs/LogoFull";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VerifyEmailModal = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray">
      <Card className="w-full max-w-[440px] mx-5">
        <CardContent className="px-5 py-6 sm:px-10 sm:py-8 flex flex-col gap-6 items-center">
          <LogoFull />
          <div className="text-center space-y-4 sm:space-y-6">
            <h4 className="text-blue-secondary-dark text-2xl font-semibold leading-7">
              Please verify to continue
            </h4>
            <div className="space-y-3 sm:space-y-4 text-gray-700 text-base">
              <p>
                We just sent an email to the address:{" "}
                <span className="font-semibold">hello@justinchong.io.</span>
              </p>
              <p>
                Please check your email and click on the link provided to verify
                your address.
              </p>
            </div>
          </div>
          <Button
            type="submit"
            className="rounded-full w-full py-2.5 px-7 text-base font-semibold leading-5"
          >
            Go to inbox
          </Button>
          <Button
            variant="outline"
            className="border-blue-secondary-dark rounded-full font-semibold text-base leading-5 w-full py-2.5"
          >
            Resend verification email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailModal;

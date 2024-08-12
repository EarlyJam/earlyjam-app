import LogoFull from "@/assets/svgs/LogoFull";
import Button from "@/components/shared-components/Button";
import { Card, CardContent } from "@/components/ui/card";
import { resendVerificationEmail } from "@/helpers/auth";
import { getEmailProvider } from "@/utils";

type VerifyEmailModalProps = {
  email: string;
};

function VerifyEmailModal(props: VerifyEmailModalProps) {
  const { email } = props;

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray">
      <Card className="mx-5 w-full max-w-[440px]">
        <CardContent className="flex flex-col items-center gap-6 px-5 py-6 sm:px-10 sm:py-8">
          <LogoFull />
          <div className="space-y-4 text-center sm:space-y-6">
            <h4 className="text-2xl font-semibold leading-7 text-blue-secondary-dark">
              Please verify to continue
            </h4>
            <div className="space-y-3 text-base text-gray-700 sm:space-y-4">
              <p>
                We just sent an email to the address:{" "}
                <span className="font-semibold">{email}.</span>
              </p>
              <p>
                Please check your email and click on the link provided to verify
                your address.
              </p>
            </div>
          </div>
          <a
            className="w-full"
            href={getEmailProvider(email)}
            target="_blank"
            rel="noreferrer"
          >
            <Button>Go to inbox</Button>
          </a>
          <Button
            variant="outline"
            showLoaderOnClick
            onClick={() => resendVerificationEmail(email)}
          >
            Resend verification email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default VerifyEmailModal;

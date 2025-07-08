import { useState } from "react";
import Button from "@/components/shared-components/Button";
import { resendVerificationEmail } from "@/helpers/auth";

type EmailVerificationBannerProps = {
  email: string;
}

function EmailVerificationBanner({ email }: EmailVerificationBannerProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    await resendVerificationEmail(email);
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="rounded-xl bg-yellow-50 p-6 flex flex-col gap-2 border border-yellow-200 mb-4">
      <p className="text-lg font-semibold leading-6 text-gray-800">
        Please verify your email address
      </p>
      <p className="text-base font-normal leading-5.5 text-gray-800">
        We sent a verification link to <span className="font-semibold">{email}</span>.<br />
        You need to verify your email to access all features.
      </p>
      <div>
        <Button
          variant="outline"
          loading={loading}
          disabled={sent || loading}
          onClick={handleResend}
          className="w-auto"
        >
          {sent ? "Verification Email Sent" : "Resend Verification Email"}
        </Button>
      </div>
    </div>
  );
}

export default EmailVerificationBanner; 
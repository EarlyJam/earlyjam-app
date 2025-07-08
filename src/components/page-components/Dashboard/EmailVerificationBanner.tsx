type EmailVerificationBannerProps = {
  email: string;
}

function EmailVerificationBanner({ email }: EmailVerificationBannerProps) {
  return (
    <div className="rounded-xl bg-yellow-50 border-l-4 border-yellow-400 p-4 flex flex-row items-center gap-4 shadow-sm mb-4">
      <div className="flex-shrink-0">
        {/* Icon for attention/trust */}
        <svg className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-gray-900">Verify your email to unlock all features</p>
        <p className="text-sm text-gray-700 mt-1">We sent a verification link to <span className="font-semibold">{email}</span>. To access all features and keep your account secure, please verify your email address. <span className="text-gray-500">(It only takes a minute!)</span></p>
      </div>
      <a
        href="/settings" // TODO: Update to actual settings/verification page if different
        className="inline-block rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition"
      >
        Verify your email
      </a>
    </div>
  );
}

export default EmailVerificationBanner; 
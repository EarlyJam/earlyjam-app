import React from "react";

type AuthTwoColumnLayoutProps = {
  children: React.ReactNode;
  headline?: string;
  subheadline?: string;
}

const AuthTwoColumnLayout: React.FC<AuthTwoColumnLayoutProps> = ({
  children,
  headline = "The simplest way to manage your workforce",
  subheadline = "Enter your credentials to access your account"
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg flex overflow-hidden">
        {/* Left: Form */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
          {children}
        </div>
        {/* Right: Illustration */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-blue-600 p-8 relative">
          <div className="text-white mb-8 text-center">
            <h2 className="text-2xl font-bold mb-2">{headline}</h2>
            <p className="text-base opacity-80">{subheadline}</p>
          </div>
          <img
            src="/assets/images/signup_info_background.jpeg"
            alt="Placeholder illustration"
            className="rounded-2xl shadow-xl max-w-full max-h-[400px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthTwoColumnLayout; 
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";

import Google from "@/assets/svgs/Google";
import LogoFull from "@/assets/svgs/LogoFull";
import EmailLoginForm from "@/components/page-components/Login/EmailLoginForm";
import { Button as ShadButton } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { isAuthenticated, signInWithGoogle } from "@/helpers/auth";

const searchSchema = z.object({
  redirect: z.string().optional()
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  async beforeLoad() {
    const authenticated = await isAuthenticated();

    if (authenticated) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: "/dashboard"
      });
    }
  },
  component: Login
});

function Login() {
  const { redirect } = Route.useSearch();

  const handleGoogleLogin = async () => {
    await signInWithGoogle(redirect);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white pt-8 pb-8 px-4 sm:px-16">
      <div className="w-full max-w-[410px] mx-auto">
        <div className="mb-12 flex flex-row items-center justify-between">
          <a href="https://www.earlyjam.com">
            <LogoFull />
          </a>
        </div>
        <h2 className="mb-4 font-fraunces text-3xl sm:text-4xl leading-10 text-blue-secondary-dark">
          Log in to your account
        </h2>
        <p className="mb-6 text-base text-gray-600-secondary">
          Enter your email and password to access your account.
        </p>
        <div className="mb-4">
          <ShadButton
            variant="outline"
            className="w-full rounded-full border-gray-400-disable py-2.5 flex items-center justify-center"
            onClick={handleGoogleLogin}
            type="button"
          >
            <span className="mr-3">
              <Google />
            </span>
            Log in with Google
          </ShadButton>
        </div>
        <Divider text="or" />
        <div className="mt-4">
          <EmailLoginForm redirect={redirect} />
        </div>
        <p className="mt-4 text-sm text-gray-700 text-center">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-blue-primary-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

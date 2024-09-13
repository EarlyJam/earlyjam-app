import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";

import Google from "@/assets/svgs/Google";
import LogoFull from "@/assets/svgs/LogoFull";
import EmailLoginForm from "@/components/page-components/Login/EmailLoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
        to: "/"
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
    <div className="flex h-screen w-screen items-center justify-center bg-gray px-6">
      <Card className="w-full bg-white sm:max-w-[440px]">
        <CardContent className="flex flex-col items-center gap-6 px-5 py-6 sm:px-10 sm:py-8">
          <LogoFull />
          <h4 className="text-xl font-semibold leading-6 text-blue-secondary-dark sm:text-2xl sm:leading-7">
            Welcome back
          </h4>
          <Button
            variant="outline"
            className="w-full rounded-full border-gray-400-disable py-2.5"
            onClick={handleGoogleLogin}
          >
            <span className="mr-3">
              <Google />
            </span>
            Sign in with Google
          </Button>
          <Divider text="or" />
          <EmailLoginForm redirect={redirect} />
          <p className="text-sm font-normal text-blue-secondary-dark">
            Don’t have an account?&nbsp;
            <Link
              to="/signup"
              className="text-sm font-semibold text-blue-primary-500"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

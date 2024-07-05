import Google from "@/assets/svgs/Google";
import LogoFull from "@/assets/svgs/LogoFull";
import EmailLoginForm from "@/components/page-components/Login/EmailLoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Divider from "@/components/ui/divider";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <div className="h-screen w-screen bg-gray flex justify-center items-center px-6">
      <Card className="w-full sm:max-w-[440px] bg-white">
        <CardContent className="px-5 py-6 sm:px-10 sm:py-8 flex flex-col items-center gap-6">
          <LogoFull />
          <h4 className="text-blue-secondary-dark text-xl sm:text-2xl font-semibold leading-6 sm:leading-7">
            Welcome back
          </h4>
          <Button
            variant="outline"
            className="border-gray-400-disable rounded-full w-full py-2.5"
          >
            <span className="mr-3">
              <Google />
            </span>
            Sign in with Google
          </Button>
          <Divider text="or" />
          <EmailLoginForm />
          <p className="text-blue-secondary-dark text-sm font-normal">
            Don’t have an account?&nbsp;
            <Link
              to="/signup"
              className="font-semibold text-blue-primary-500 text-sm"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

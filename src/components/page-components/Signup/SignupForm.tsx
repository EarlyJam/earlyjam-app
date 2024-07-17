import Google from "@/assets/svgs/Google";
import Button from "@/components/shared-components/Button";
import { Button as ShadButton } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserType } from "@/enums/user";
import { signup, signUpWithGoogle } from "@/helpers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters or numbers",
    }),
  lastName: z
    .string({ message: "Last name is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters or numbers",
    }),
  email: z
    .string({ message: "Email address is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Too short. Please use at least 8 characters" }),
});

type FormType = z.infer<typeof formSchema>;

type SignupFormProps = {
  type: UserType;
  onDone(email: string): void;
};

const SignupForm: FC<SignupFormProps> = (props) => {
  const { onDone, type = UserType.Client } = props;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (data: FormType) => {
    const { email, password, firstName, lastName } = data;

    await signup(email, password, {
      data: {
        first_name: firstName,
        last_name: lastName,
        user_type: type,
      },
      emailRedirectTo: `${window.location.origin}/${type === UserType.Client ? "create-brief" : ""}`,
    });

    onDone(email);
  };

  const handleGoogleSignup = async () => {
    await signUpWithGoogle(type);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-6">
          <ShadButton
            variant="outline"
            className="border-gray-400-disable rounded-full w-full py-2.5"
            onClick={handleGoogleSignup}
            type="button"
          >
            <span className="mr-3">
              <Google />
            </span>
            Sign up with Google
          </ShadButton>
          <Divider text="or" />
          <div className="space-y-5">
            <div className="flex flex-row gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Must be at least 8 characters."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <Button type="submit">Create Account</Button>
            <p className="text-gray-600-secondary text-sm text-center">
              Already have an account?&nbsp;
              <Link
                to="/signup"
                className="font-semibold text-blue-primary-500 text-sm"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;

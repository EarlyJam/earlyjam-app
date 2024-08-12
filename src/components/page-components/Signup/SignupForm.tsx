import { FC } from "react";

import { Link } from "@tanstack/react-router";
import { z } from "zod";

import Google from "@/assets/svgs/Google";
import Button from "@/components/shared-components/Button";
import Form from "@/components/shared-components/Form";
import { Button as ShadButton } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { FormFieldType } from "@/enums/form";
import { UserType } from "@/enums/user";
import { signup, signUpWithGoogle } from "@/helpers/auth";
import { FormField } from "@/types/form";

const formSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters or numbers"
    }),
  lastName: z
    .string({ message: "Last name is required" })
    .regex(/^[a-zA-Z]+$/, {
      message: "No special characters or numbers"
    }),
  email: z
    .string({ message: "Email address is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Too short. Please use at least 8 characters" })
});

type FormType = z.infer<typeof formSchema>;

const FORM_FIELDS: FormField<FormType>[] = [
  {
    type: FormFieldType.TextField,
    name: "firstName",
    label: "First name",
    fieldData: {
      type: "text"
    }
  },
  {
    type: FormFieldType.TextField,
    name: "lastName",
    label: "Last name",
    fieldData: {
      type: "text"
    }
  },
  {
    type: FormFieldType.TextField,
    name: "email",
    label: "Email",
    fieldData: {
      type: "email"
    },
    className: "col-span-2"
  },
  {
    type: FormFieldType.TextField,
    name: "password",
    label: "Password",
    fieldData: {
      type: "password",
      placeholder: "Must be at least 8 characters."
    },
    className: "col-span-2"
  }
];

type SignupFormProps = {
  type: UserType;
  onDone(email: string): void;
};

const SignupForm: FC<SignupFormProps> = (props) => {
  const { onDone, type = UserType.Client } = props;

  const handleSubmit = async (data: FormType) => {
    const { email, password, firstName, lastName } = data;

    await signup(email, password, {
      data: {
        first_name: firstName,
        last_name: lastName,
        user_type: type
      },
      emailRedirectTo: `${window.location.origin}/${type === UserType.Client ? "project/create" : "onboarding"}`
    });

    onDone(email);
  };

  const handleGoogleSignup = async () => {
    await signUpWithGoogle(type);
  };

  return (
    <div className="flex flex-col gap-6">
      <ShadButton
        variant="outline"
        className="w-full rounded-full border-gray-400-disable py-2.5"
        onClick={handleGoogleSignup}
        type="button"
      >
        <span className="mr-3">
          <Google />
        </span>
        Sign up with Google
      </ShadButton>
      <Divider text="or" />
      <div className="space-y-4">
        <Form
          schema={formSchema}
          onSubmit={handleSubmit}
          fields={FORM_FIELDS}
          fieldsContainerClassName="grid grid-cols-2 space-y-0 gap-x-3 gap-y-5"
        >
          <Button type="submit">Create Account</Button>
        </Form>
        <p className="text-center text-sm text-gray-600-secondary">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="text-sm font-semibold text-blue-primary-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;

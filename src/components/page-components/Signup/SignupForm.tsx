import { FC, useState } from "react";

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
import VerifyEmailModal from "@/components/page-components/Signup/VerifyEmailModal";

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
      type: "text",
      placeholder: "e.g. Sarah"
    }
  },
  {
    type: FormFieldType.TextField,
    name: "lastName",
    label: "Last name",
    fieldData: {
      type: "text",
      placeholder: "e.g. Tan"
    }
  },
  {
    type: FormFieldType.TextField,
    name: "email",
    label: "Email",
    fieldData: {
      type: "email",
      placeholder: "e.g. sarah.tan@example.com"
    },
    className: "col-span-2"
  },
  {
    type: FormFieldType.TextField,
    name: "password",
    label: "Password",
    fieldData: {
      type: "password",
      placeholder: "Create a secure password (min. 8 characters)"
    },
    className: "col-span-2"
  }
];

type SignupFormProps = {
  type: UserType;
  onDone?: () => void;
};

const SignupForm: FC<SignupFormProps> = (props) => {
  const { type = UserType.Client, onDone } = props;
  const [agreed, setAgreed] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState<string | null>(null);

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

    setShowVerifyModal(email);
    if (onDone) onDone();
  };

  const handleGoogleSignup = async () => {
    await signUpWithGoogle(type);
  };

  return (
    <div className="flex flex-col gap-6">
      {showVerifyModal ? (
        <VerifyEmailModal email={showVerifyModal} />
      ) : (
        <>
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
              <div className="col-span-2 flex items-start mb-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-1 mr-2 accent-[#7AD38E] w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-[#7AD38E]"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-700 select-none">
                  Yes, I understand and agree to the EarlyJam
                  <a href="https://www.earlyjam.com/terms" target="_blank" rel="noopener noreferrer" className="text-blue-primary-500 underline ml-1">Terms of Service</a>,
                  including the
                  <a href="https://www.earlyjam.com/user-agreement" target="_blank" rel="noopener noreferrer" className="text-blue-primary-500 underline mx-1">User Agreement</a>
                  and
                  <a href="https://www.earlyjam.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-primary-500 underline ml-1">Privacy Policy</a>.
                </label>
              </div>
              <Button type="submit" disabled={!agreed}>Create Account</Button>
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
        </>
      )}
    </div>
  );
};

export default SignupForm;

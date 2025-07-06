import { FC } from "react";

import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import ForgetPasswordButton from "@/components/page-components/Login/ForgetPasswordDialog.tsx";
import Button from "@/components/shared-components/Button";
import Form from "@/components/shared-components/Form";
import { FormFieldType } from "@/enums/form";
import { signInWithPassword } from "@/helpers/auth";
import { useToast } from "@/hooks/useToast";
import { FormField } from "@/types/form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormType = z.infer<typeof formSchema>;

const FORM_FIELDS: FormField<FormType>[] = [
  {
    type: FormFieldType.TextField,
    name: "email",
    label: "Email",
    fieldData: {
      type: "email",
      placeholder: "e.g. sarah.tan@example.com"
    }
  },
  {
    type: FormFieldType.TextField,
    name: "password",
    label: "Password",
    fieldData: {
      type: "password",
      placeholder: "Enter your password"
    }
  }
];

type EmailLoginFormProps = {
  redirect?: string;
};

const EmailLoginForm: FC<EmailLoginFormProps> = (props) => {
  const { redirect } = props;

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (data: FormType) => {
    signInWithPassword(data.email, data.password)
      .then(async () => {
        toast({
          title: "Login Success!"
        });
        await navigate({ to: redirect ?? "/" });
      })
      .catch((e: unknown) => {
        const error = e as Error;
        toast({
          title: "Login Failed!",
          description: error.message,
          variant: "destructive"
        });
      });
  };

  return (
    <Form
      schema={formSchema}
      onSubmit={handleSubmit}
      fields={FORM_FIELDS}
      defaultValues={{
        email: "",
        password: ""
      }}
    >
      <div className="space-y-6">
        <div className="flex w-full flex-row items-center justify-between">
          <ForgetPasswordButton />
        </div>
        <Button type="submit">Login</Button>
      </div>
    </Form>
  );
};

export default EmailLoginForm;

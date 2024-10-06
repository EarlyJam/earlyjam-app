import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import Button from "@/components/shared-components/Button";
import Form from "@/components/shared-components/Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx";
import { FormFieldType } from "@/enums/form.ts";
import { updateUserPassword } from "@/helpers/auth.ts";
import { useToast } from "@/hooks/useToast.ts";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    }
  );

export const Route = createFileRoute("/_auth/reset-password")({
  component: ResetPassword
});

function ResetPassword() {
  const navigate = Route.useNavigate();
  const { toast } = useToast();

  return (
    <div className="flex h-screen w-screen items-center justify-center px-6">
      <Card className="max-w-card">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your new password and we&apos;ll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            schema={resetPasswordSchema}
            fields={[
              {
                name: "password",
                label: "Password",
                type: FormFieldType.TextField,
                fieldData: {
                  type: "password",
                  placeholder: "Enter your new password"
                }
              },
              {
                name: "confirmPassword",
                label: "Confirm Password",
                type: FormFieldType.TextField,
                fieldData: {
                  type: "password",
                  placeholder: "Confirm your new password"
                }
              }
            ]}
            onSubmit={(data) => {
              updateUserPassword(data.password)
                .then(() => {
                  toast({
                    title: "Password updated successfully!",
                    description: "Please login with your new password."
                  });

                  void navigate({
                    to: "/"
                  });
                })
                .catch(() => {
                  toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                    description: "Please try again later."
                  });
                });
            }}
          >
            <Button type="submit" className="w-auto">
              Reset Password
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";

import { z } from "zod";

import Button from "@/components/shared-components/Button";
import Form from "@/components/shared-components/Form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import { FormFieldType } from "@/enums/form.ts";
import { sendResetPasswordEmail } from "@/helpers/auth.ts";
import { useToast } from "@/hooks/useToast.ts";

const schema = z.object({
  email: z.string().email()
});

function ForgetPasswordButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="link"
          className="h-auto w-auto p-0 text-sm font-semibold leading-4 text-blue-secondary-dark underline underline-offset-4"
        >
          Forgot password?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Forgot password?</DialogTitle>
          <DialogDescription>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </DialogDescription>
        </DialogHeader>
        <Form
          id="forgot-password-form"
          schema={schema}
          fields={[
            {
              type: FormFieldType.TextField,
              name: "email",
              label: "Email",
              fieldData: {
                type: "email",
                placeholder: "hello@example.com"
              }
            }
          ]}
          onSubmit={async (data) => {
            setLoading(true);
            await sendResetPasswordEmail(data.email)
              .catch(() => {
                toast({
                  variant: "destructive",
                  title: "Something went wrong!",
                  description: "Please try again later."
                });
              })
              .then(() => {
                setOpen(false);
                toast({
                  title: "Check your email!",
                  description: "We've sent you a link to reset your password."
                });
              });
            setLoading(false);
          }}
        >
          {(_, submitForm) => (
            <Button
              form="forgot-password-form"
              onClick={submitForm}
              loading={loading}
            >
              Send link
            </Button>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ForgetPasswordButton;

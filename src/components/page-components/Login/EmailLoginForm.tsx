import Button from "@/components/shared-components/Button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithPassword } from "@/helpers/auth";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormType = z.infer<typeof formSchema>;

const EmailLoginForm: FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: FormType) => {
    signInWithPassword(data.email, data.password)
      .then(async (response) => {
        console.log(response);
        toast({
          title: "Login Success!",
        });
        await navigate({ to: "/" });
      })
      .catch((e: unknown) => {
        const error = e as Error;
        console.log(e);
        toast({
          title: "Login Failed!",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="space-y-5">
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-row items-end gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="cursor-pointer">
              Remember for 30 days
            </Label>
          </div>
          <Link className="text-blue-secondary-dark text-sm font-semibold leading-4 underline underline-offset-4">
            Forgot password?
          </Link>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default EmailLoginForm;

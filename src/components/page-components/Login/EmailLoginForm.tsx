import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormType = z.infer<typeof formSchema>;

const EmailLoginForm: FC = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-6 w-full">
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
        <Button
          type="submit"
          className="rounded-full w-full py-2.5 px-7 text-base font-semibold leading-5"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default EmailLoginForm;

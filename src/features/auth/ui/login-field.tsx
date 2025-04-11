import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { signInFormSchema } from "@/features/auth/containers/sign-in-form";
import { signUpFormSchema } from "@/features/auth/containers/sign-up-form";

export function LoginField({
  formInstance,
}: {
  formInstance: UseFormReturn<
    z.infer<typeof signInFormSchema | typeof signUpFormSchema>
  >;
}) {
  return (
    <FormField
      control={formInstance.control}
      name="login"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Login</FormLabel>
          <FormControl>
            <Input placeholder="JohnDoe" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

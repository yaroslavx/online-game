import {
  FormControl,
  FormDescription,
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

export function PasswordField({
  formInstance,
  description,
}: {
  formInstance: UseFormReturn<
    z.infer<typeof signInFormSchema | typeof signUpFormSchema>
  >;
  description?: string;
}) {
  return (
    <FormField
      control={formInstance.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" {...field} />
          </FormControl>
          {!!description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

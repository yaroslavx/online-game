import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FieldValues, UseFormReturn } from "react-hook-form";
import * as z from "zod";

export function LoginField({
  formInstance,
}: {
  formInstance: UseFormReturn<z.infer<typeof formSchema>>;
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

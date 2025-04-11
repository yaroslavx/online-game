import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { signInFormSchema } from "@/features/auth/containers/sign-in-form";
import { signUpFormSchema } from "@/features/auth/containers/sign-up-form";

export function AuthFormLayout({
  description,
  fields,
  title,
  link,
  action,
  actions,
  error,
}: {
  title: string;
  description: string;
  fields: ReactNode;
  actions: ReactNode;
  link: ReactNode;
  formInstance: UseFormReturn<
    z.infer<typeof signInFormSchema | typeof signUpFormSchema>
  >;
  action: (formData: FormData) => Promise<void>;
  error: ReactNode;
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          {fields}
          {!!error && error}
          {actions}
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">{link}</CardFooter>
    </Card>
  );
}

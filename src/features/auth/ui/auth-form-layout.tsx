import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Form } from "@/shared/ui/form";
import { ReactNode } from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

export function AuthFormLayout({
  description,
  fields,
  title,
  link,
  formInstance,
  onSubmit,
  actions,
  error,
}: {
  title: string;
  description: string;
  fields: ReactNode;
  actions: ReactNode;
  link: ReactNode;
  formInstance: UseFormReturn;
  onSubmit: SubmitHandler<FieldValues>;
  error: ReactNode;
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...formInstance}>
          <form
            onSubmit={formInstance.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {fields}
            {!!error && error}
            {actions}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">{link}</CardFooter>
    </Card>
  );
}

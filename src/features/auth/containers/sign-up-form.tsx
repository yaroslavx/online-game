"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";
import { PasswordField } from "@/features/auth/ui/password-field";
import { LoginField } from "@/features/auth/ui/login-field";
import { BottomLink } from "@/features/auth/ui/bottom-link";
import { right } from "@/shared/lib/either";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { ErrorMessage } from "@/features/auth/ui/error-message";

export const signUpFormSchema = z.object({
  login: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  useActionState(signUpAction, righn(undefined));

  // async function onSubmit(_: z.infer<typeof signUpFormSchema>) {
  //   setIsLoading(true);
  //
  //   try {
  //     // This is where you would typically make an API call to register the user
  //     // For example:
  //     // const response = await fetch('/api/auth/register', {
  //     //   method: 'POST',
  //     //   headers: { 'Content-Type': 'application/json' },
  //     //   body: JSON.stringify({
  //     //     name: values.name,
  //     //     email: values.email,
  //     //     password: values.password,
  //     //   }),
  //     // })
  //
  //     // if (!response.ok) throw new ErrorMessage('Registration failed')
  //
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //
  //     toast("You've successfully signed up.");
  //
  //     // Redirect to signin page after successful registration
  //     router.push("/signin");
  //   } catch {
  //     toast("Something went wrong. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <AuthFormLayout
      title={"Create an account"}
      description={"Enter your information below to create your account"}
      fields={
        <>
          <LoginField formInstance={form} />
          <PasswordField
            formInstance={form}
            description="Must be at least 8 characters long"
          />
        </>
      }
      actions={<SubmitButton>Sign up</SubmitButton>}
      link={
        <BottomLink
          linkText="Already have an account?"
          href="/signin"
          text="Sign in"
        />
      }
      formInstance={form}
      error={<ErrorMessage error={right(null)} />}
    />
  );
}

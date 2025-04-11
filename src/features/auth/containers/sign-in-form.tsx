"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "react-toastify";
import { LoginField } from "@/features/auth/ui/login-field";
import { PasswordField } from "@/features/auth/ui/password-field";
import { SubmitButton } from "@/features/auth/ui/submit-button";
import { BottomLink } from "@/features/auth/ui/bottom-link";
import { ErrorMessage } from "@/features/auth/ui/error-message";
import { right } from "@/shared/lib/either";
import { AuthFormLayout } from "@/features/auth/ui/auth-form-layout";

export const signInFormSchema = z.object({
  login: z.string().min(1, {
    message: "Name must be at least 1 characters.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function onSubmit(_: z.infer<typeof signInFormSchema>) {
    setIsLoading(true);

    try {
      // This is where you would typically make an API call to authenticate the user
      // For example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: values.email,
      //     password: values.password,
      //   }),
      // })

      // if (!response.ok) throw new ErrorMessage('Authentication failed')

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("You've successfully signed in.");

      // Redirect to dashboard after successful login
      router.push("/dashboard");
    } catch {
      toast("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthFormLayout
      title={"Sign in"}
      description={"Enter your credentials to access your account"}
      fields={
        <>
          <LoginField formInstance={form} />
          <PasswordField formInstance={form} />
        </>
      }
      actions={<SubmitButton>Sign in</SubmitButton>}
      link={
        <BottomLink
          linkText="Don't have an account?"
          href="/signup"
          text="Sign up"
        />
      }
      formInstance={form}
      error={<ErrorMessage error={right(null)} />}
    />
  );
}

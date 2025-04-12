"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";

import { BottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/erro-message";
import { useActionState } from "@/shared/lib/react";
import { signUpAction } from "../actions/sign-up";
import { right } from "@/shared/lib/either";

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    right(undefined),
  );

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account to get started"
      action={action}
      fields={<AuthFields />}
      actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
      error={<ErrorMessage error={formState} />}
      link={
        <BottomLink
          text="Already have an account?"
          linkText="Sign in"
          url="/signin"
        />
      }
    />
  );
}

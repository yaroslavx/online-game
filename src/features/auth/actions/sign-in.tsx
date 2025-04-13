"use server";

import { z } from "zod";
import { sessionService, verifyUserPassword } from "@/entities/user/server";
import { redirect } from "next/navigation";

export type SignInFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    _errors?: string;
  };
};

const formDataScheme = z.object({
  login: z.string().min(3),
  password: z.string().min(8),
});

export const signInAction = async (
  state: SignInFormState,
  formData: FormData,
): Promise<SignInFormState> => {
  const data = Object.fromEntries(formData.entries());

  const result = formDataScheme.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.format();
    return {
      formData,
      errors: {
        login: formattedErrors.login?._errors.join(", "),
        password: formattedErrors.password?._errors.join(", "),
        _errors: formattedErrors._errors.join(", "),
      },
    };
  }

  const userFromDb = await verifyUserPassword({
    login: result.data.login,
    password: result.data.password,
  });

  if (userFromDb.type === "right") {
    await sessionService.addSession(userFromDb.value);

    redirect("/");
  }

  const errors = {
    "wrong-login-or-password": "Wrong login or password",
  }[userFromDb.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
};

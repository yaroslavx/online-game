"use server";

import { z } from "zod";
import { createUser, sessionService } from "@/entities/user/server";
import { redirect } from "next/navigation";

export type SignUpFormState = {
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

export const signUpAction = async (
  state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> => {
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

  const createdUser = await createUser(result.data);

  if (createdUser.type === "right") {
    await sessionService.addSession(createdUser.value);

    redirect("/");
  }

  const errors = {
    "user-login-exists": `User with login ${result.data.login} already exists`,
  }[createdUser.error];

  return {
    formData,
    errors: {
      _errors: errors,
    },
  };
};

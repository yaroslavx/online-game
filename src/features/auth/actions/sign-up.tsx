import { left, mapLeft } from "@/shared/lib/either";
import { z } from "zod";
import { createUser } from "@/entities/user/server";

const formDataScheme = z.object({
  login: z.string().min(3),
  password: z.string().min(8),
});

export const signUpAction = async (state: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  const result = formDataScheme.safeParse(data);

  if (!result.success) {
    return left(`${result.error.message}`);
  }

  const createdUser = await createUser(result.data);

  return mapLeft(createdUser, (error) => {
    return {
      "user-login-exists": {
        type: `User with login ${result.data.login} already exists`,
      },
    }[error];
  });
};

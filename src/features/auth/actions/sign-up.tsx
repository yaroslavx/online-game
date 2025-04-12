import { left } from "@/shared/lib/either";

export const signUpAction = async (state: unknown, formData: FormData) => {
  console.log(formData.get("login"), formData.get("password"));
  return left("login-already-taken" as const);
};

import { left } from "@/shared/lib/either";

export const signInAction = async (state: unknown, formData: FormData) => {
  console.log(formData.get("login"), formData.get("password"));
  return left("message");
};

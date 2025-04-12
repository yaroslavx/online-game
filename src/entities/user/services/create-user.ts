import { userRepository } from "@/entities/user/repositories/user";
import { left } from "@/shared/lib/either";
import cuid from "cuid";
import { DEFAULT_RATING } from "@/entities/user/domain";

export const createUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const userWithLogin = await userRepository.getUser({ login });

  if (userWithLogin) {
    return left("user-login-exists");
  }

  const

   userRepository.getUser({id: cuid(), login, rating: DEFAULT_RATING});
};

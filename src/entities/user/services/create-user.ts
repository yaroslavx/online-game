import { userRepository } from "@/entities/user/repositories/user";
import { left, right } from "@/shared/lib/either";
import cuid from "cuid";
import { DEFAULT_RATING } from "@/entities/user/domain";
import { passwordService } from "@/entities/user/services/password";

export const createUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const userWithLogin = await userRepository.getUser({ login });

  if (userWithLogin) {
    return left("user-login-exists" as const);
  }

  const { hash, salt } = await passwordService.hashPassword(password);

  const user = await userRepository.getUser({
    id: cuid(),
    login,
    rating: DEFAULT_RATING,
    passwordHash: hash,
    salt,
  });

  return right(user);
};

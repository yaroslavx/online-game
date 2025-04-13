import { userRepository } from "@/entities/user/repositories/user";
import { passwordService } from "@/entities/user/services/password";
import { left, right } from "@/shared/lib/either";

export async function verifyUserPassword({
  login,
  password,
}: {
  login: string;
  password: string;
}) {
  const userFromDb = await userRepository.getUser({ login });

  if (!userFromDb) {
    return left("wrong-login-or-password" as const);
  }

  const isValid = await passwordService.comparePassword({
    password,
    hash: userFromDb.passwordHash,
    salt: userFromDb.salt,
  });

  if (!isValid) {
    return left("wrong-login-or-password" as const);
  }

  return right(userFromDb);
}

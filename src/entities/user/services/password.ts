import { pbkdf2, randomBytes } from "node:crypto";

async function hashPassword(
  password: string,
  salt: string = randomBytes(16).toString("hex"),
) {
  const hash = await new Promise<Buffer>((res, rej) =>
    pbkdf2(password, salt, 1000, 64, "sha512", (error, value) =>
      error ? rej(error) : res(value),
    ),
  );

  return {
    hash: hash.toString("hex"),
    salt,
  };
}

async function comparePassword({
  password,
  hash,
  salt,
}: {
  password: string;
  hash: string;
  salt: string;
}) {
  return hash === (await hashPassword(password, salt)).hash;
}

export const passwordService = { comparePassword, hashPassword };

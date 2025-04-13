import { pbkdf2, randomBytes } from "node:crypto";

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");

  return new Promise<Buffer>((res, rej) =>
    pbkdf2(password, salt, 1000, 64, "sha512", (error, value) =>
      error ? rej(error) : res(value),
    ),
  ).then((r) => r.toString("hex"));
}

function comparePassword({
  password,
  hash,
  salt,
}: {
  password: string;
  hash: string;
  salt: string;
}) {}

export const passwordService = {};

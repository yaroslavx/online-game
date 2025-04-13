import "server-only";
import { SignJWT, jwtVerify } from "jose";
import {
  SessionEntity,
  UserEntity,
  userToSession,
} from "@/entities/user/domain";
import { left, right } from "@/shared/lib/either";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function encrypt(payload: SessionEntity) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return right(payload);
  } catch (error) {
    return left(error);
  }
}

async function setSessionToCookie(user: UserEntity) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const sessionData = userToSession(user, expiresAt.toISOString());

  const session = await encrypt(sessionData);

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    // secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

const sessionService = { encrypt, decrypt, setSessionToCookie };

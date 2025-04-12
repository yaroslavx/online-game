import { UserEntity } from "@/entities/user/domain";
import { db } from "@/shared/lib/db";
import { Prisma } from "@prisma/client";

export function saveUser(user: UserEntity) {
  return db.user.upsert({
    where: { id: user.id },
    create: user,
    update: user,
  });
}

export function getUser(where: Prisma.UserWhereInput) {
  return db.user.findFirst({ where });
}

export const userRepository = { saveUser, getUser };

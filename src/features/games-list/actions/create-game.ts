"use server";

import { createGame } from "@/entities/game/server";
import { db } from "@/shared/lib/db";
import { left } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export const createGameAction = async () => {
  const user = await db.user.findFirst();

  if (!user) {
    return left("user-does-not-exist" as const);
  }

  const createdGame = await createGame(user);

  if (createdGame.type === "right") {
    redirect(`/game/${createdGame.value.id}`);
  }

  return createdGame;
};

"use server";

import { createGame } from "@/entities/game/server";
import { left } from "@/shared/lib/either";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/entities/user/server";

export const createGameAction = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return left("user-does-not-exist" as const);
  }

  const createdGame = await createGame(user);

  if (createdGame.type === "right") {
    redirect(`/game/${createdGame.value.id}`);
  }

  return createdGame;
};

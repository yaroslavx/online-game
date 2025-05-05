"use server";

import { getCurrentUser } from "@/entities/user/server";
import { GameId } from "@/kernel/ids";
import { stepGame } from "@/entities/game/server";
import { left } from "@/shared/lib/either";
import { gameEvents } from "@/features/game/services/game-events";

export const gameStepAction = async ({
  index,
  gameId,
}: {
  gameId: GameId;
  index: number;
}): Promise<unknown> => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return left("not-found");
  }

  const result = await stepGame(gameId, currentUser, index);

  if (result.type === "right") {
    gameEvents.emit(result.value);
    return result;
  }

  return result;
};

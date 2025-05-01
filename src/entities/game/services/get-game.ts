import { gameRepository } from "@/entities/game/repositories/game";
import { GameId } from "@/kernel/ids";

export const getGameById = (gameId: GameId) => {
  return gameRepository.getGame({ id: gameId });
};

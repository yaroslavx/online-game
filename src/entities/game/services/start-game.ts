import { PlayerEntity } from "@/entities/game/domain";
import { gameRepository } from "@/entities/game/repositories/game";
import { GameId } from "@/kernel/ids";
import { left, right } from "@/shared/lib/either";
import { GameStatus } from "@prisma/client";

export async function startGame(gameId: GameId, player: PlayerEntity) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found" as const);
  }

  if (game.status !== GameStatus.idle) {
    return left("game-status-not-idle" as const);
  }

  if (game.creator.id === player.id) {
    return left("creator-can-not-start-game" as const);
  }

  return right(await gameRepository.startGame(gameId, player));
}

import { doStep, PlayerEntity } from "@/entities/game/domain";
import { gameRepository } from "@/entities/game/repositories/game";
import { GameId } from "@/kernel/ids";
import { left, right } from "@/shared/lib/either";
import { GameStatus } from "@prisma/client";

export async function stepGame(
  gameId: GameId,
  player: PlayerEntity,
  index: number,
) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found");
  }

  if (game.status !== GameStatus.inProgress) {
    return left("game-status-not-in-progress");
  }

  if (!game.players.some((p) => p.id === player.id)) {
    return left("player-is-not-in-game");
  }

  const stepResult = doStep(game, index, player);

  if (stepResult.type === "left") {
    return stepResult;
  }

  return right(await gameRepository.saveGame(stepResult.value));
}

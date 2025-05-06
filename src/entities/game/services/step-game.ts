import { GameId } from "@/kernel/ids";
import { doStep, PlayerEntity } from "../domain";
import { gameRepository } from "../repositories/game";
import { left, right } from "@/shared/lib/either";
import { gameEvents } from "@/features/game/services/game-events";
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

  const stepResult = doStep({ game, index, player });

  if (stepResult.type === "left") {
    return stepResult;
  }

  const newGame = await gameRepository.saveGame(stepResult.value);

  await gameEvents.emit(newGame);

  return right(newGame);
}

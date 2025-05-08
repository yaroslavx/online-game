import { PlayerEntity } from "@/entities/game/domain";
import { gameRepository } from "@/entities/game/repositories/game";
import { GameId } from "@/kernel/ids";
import { left, right } from "@/shared/lib/either";
import { GameStatus } from "@prisma/client";
import { gameEvents } from "@/entities/game/services/game-events";

export async function surrenderGame(gameId: GameId, player: PlayerEntity) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found" as const);
  }

  if (game.status !== GameStatus.inProgress) {
    return left("game-status-not-in-progress" as const);
  }

  if (!game.players.some((p) => p.id === player.id)) {
    return left("player-is-not-in-game" as const);
  }

  const newGame = await gameRepository.saveGame({
    ...game,
    status: GameStatus.gameOver,
    winner: game.players.find((p) => p.id !== player.id)!,
  });

  await gameEvents.emit({ type: "game-changed", data: newGame });

  return right(newGame);
}

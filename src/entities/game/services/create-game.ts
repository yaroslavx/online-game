import { gameRepository } from "@/entities/game/repositories/game";
import { GameStatus } from "@prisma/client";
import { PlayerEntity } from "@/entities/game/domain";
import cuid from "cuid";
import { left, right } from "@/shared/lib/either";

export async function createGame(player: PlayerEntity) {
  const playerGames = await gameRepository.gamesList({
    players: { some: { id: player.id } },
    status: GameStatus.idle,
  });

  const isGameInIdleStatue = playerGames.some(
    (game) => game.status === GameStatus.idle && game.creator.id === player.id,
  );

  if (isGameInIdleStatue) {
    return left("can-create-only-one-game" as const);
  }

  const createdGame = await gameRepository.createGame({
    id: cuid(),
    creator: player,
    status: GameStatus.idle,
  });

  return right(createdGame);
}

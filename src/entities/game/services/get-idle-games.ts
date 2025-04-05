import { gameRepository } from "@/entities/game/repositories/game";
import { GameStatus } from "@prisma/client";
import { GameIdleEntity } from "@/entities/game/domain";

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  return (await gameRepository.gamesList({
    status: GameStatus.idle,
  })) as GameIdleEntity[];
}

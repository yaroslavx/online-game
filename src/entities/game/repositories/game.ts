import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
} from "@/entities/game/domain";
import { db } from "@/shared/lib/db";
import { Game, GameStatus, Prisma, User } from "@prisma/client";
import { z } from "zod";
import GameWhereInput = Prisma.GameWhereInput;

async function gamesList(where?: GameWhereInput): Promise<GameEntity[]> {
  const games = await db.game.findMany({
    where,
    include: { winner: true, players: true },
  });

  return games.map((game) => dbGameToGameEntity(game));
}

const fieldScheme = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & { players: User[]; winner?: User | null },
): GameEntity {
  switch (game.status) {
    case GameStatus.idle:
      const [creator] = game.players;
      if (!creator) {
        throw new Error("game should have a creator");
      }
      return {
        id: game.id,
        creator,
        status: game.status,
      } satisfies GameIdleEntity;
    case GameStatus.inProgress:
    case GameStatus.gameOverDraw:
      return {
        id: game.id,
        players: game.players,
        status: game.status,
        field: fieldScheme.parse(game.field),
      } satisfies GameInProgressEntity | GameOverDrawEntity;
    case GameStatus.gameOver:
      if (!game.winner) {
        throw new Error("winner should be in gameOver");
      }
      return {
        id: game.id,
        players: game.players,
        status: game.status,
        field: fieldScheme.parse(game.field),
        winner: game.winner,
      } satisfies GameOverEntity;
  }
}

export const gameRepository = { gamesList };

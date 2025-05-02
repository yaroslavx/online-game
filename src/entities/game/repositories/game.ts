import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  PlayerEntity,
} from "@/entities/game/domain";
import { db } from "@/shared/lib/db";
import { Game, GameStatus, Prisma, User } from "@prisma/client";
import { z } from "zod";
import GameWhereInput = Prisma.GameWhereInput;
import { removePassword } from "@/shared/lib/password";
import { GameId } from "@/kernel/ids";

async function gamesList(where?: GameWhereInput): Promise<GameEntity[]> {
  const games = await db.game.findMany({
    where,
    include: { winner: true, players: true },
  });

  return games.map((game) => dbGameToGameEntity(game));
}

async function startGame(gameId: GameId, player: PlayerEntity) {
  return dbGameToGameEntity(
    await db.game.update({
      where: { id: gameId },
      data: {
        players: {
          connect: { id: player.id },
        },
        status: GameStatus.inProgress,
      },
      include: { winner: true, players: true },
    }),
  );
}

async function getGame(
  where?: GameWhereInput,
): Promise<GameEntity | undefined> {
  const game = await db.game.findFirst({
    where,
    include: { winner: true, players: true },
  });

  if (game) {
    return dbGameToGameEntity(game);
  }

  return undefined;
}

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await db.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: game.field,
      players: {
        connect: { id: game.creator.id },
      },
    },
    include: { players: true, winner: true },
  });

  return dbGameToGameEntity(createdGame);
}

const fieldScheme = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & { players: User[]; winner?: User | null },
): GameEntity {
  const players = game.players.map(removePassword);
  switch (game.status) {
    case GameStatus.idle:
      const [creator] = players;
      if (!creator) {
        throw new Error("game should have a creator");
      }
      return {
        id: game.id,
        creator,
        field: fieldScheme.parse(game.field),
        status: game.status,
      } satisfies GameIdleEntity;
    case GameStatus.inProgress:
    case GameStatus.gameOverDraw:
      return {
        id: game.id,
        players,
        status: game.status,
        field: fieldScheme.parse(game.field),
      } satisfies GameInProgressEntity | GameOverDrawEntity;
    case GameStatus.gameOver:
      if (!game.winner) {
        throw new Error("winner should be in gameOver");
      }
      return {
        id: game.id,
        players,
        status: game.status,
        field: fieldScheme.parse(game.field),
        winner: removePassword(game.winner),
      } satisfies GameOverEntity;
  }
}

export const gameRepository = { gamesList, createGame, getGame, startGame };

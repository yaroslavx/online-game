import {
  GameEntity,
  GameIdleEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
  PlayerEntity,
} from "@/entities/game/domain";
import { db } from "@/shared/lib/db";
import { Game, GamePlayer, GameStatus, Prisma, User } from "@prisma/client";
import { z } from "zod";
import GameWhereInput = Prisma.GameWhereInput;
import { GameId } from "@/kernel/ids";

const gameInclude = {
  winner: { include: { user: true } },
  players: { include: { user: true } },
};

async function gamesList(where?: GameWhereInput): Promise<GameEntity[]> {
  const games = await db.game.findMany({
    where,
    include: gameInclude,
  });

  return games.map((game) => dbGameToGameEntity(game));
}

async function startGame(gameId: GameId, player: PlayerEntity) {
  return dbGameToGameEntity(
    await db.game.update({
      where: { id: gameId },
      data: {
        players: {
          create: { index: 1, userId: player.id },
        },
        status: GameStatus.inProgress,
      },
      include: gameInclude,
    }),
  );
}

async function saveGame(
  game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity,
) {
  const winnerId =
    game.status === GameStatus.gameOver
      ? await db.gamePlayer
          .findFirstOrThrow({
            where: { userId: game.winner.id },
          })
          .then((p) => p.id)
      : undefined;

  return dbGameToGameEntity(
    await db.game.update({
      where: { id: game.id },
      data: {
        status: game.status,
        field: game.field,
        winnerId: winnerId,
      },
      include: gameInclude,
    }),
  );
}

async function getGame(
  where?: GameWhereInput,
): Promise<GameEntity | undefined> {
  const game = await db.game.findFirst({
    where,
    include: gameInclude,
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
        create: { index: 0, userId: game.creator.id },
      },
    },
    include: gameInclude,
  });

  return dbGameToGameEntity(createdGame);
}

const fieldScheme = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntity(
  game: Game & {
    players: Array<GamePlayer & { user: User }>;
    winner?: (GamePlayer & { user: User }) | null;
  },
): GameEntity {
  const players = game.players
    .sort((a, b) => a.index - b.index)
    .map(dbPlayerToPlayer);

  switch (game.status) {
    case GameStatus.idle:
      const [creator] = players;
      if (!creator) {
        throw new Error("game should have a creator");
      }
      return {
        id: game.id,
        creator: creator,
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
        winner: dbPlayerToPlayer(game.winner),
      } satisfies GameOverEntity;
  }
}

export const dbPlayerToPlayer = (
  dbPlayer: GamePlayer & { user: User },
): PlayerEntity => {
  return {
    id: dbPlayer.user.id,
    login: dbPlayer.user.login,
    rating: dbPlayer.user.rating,
  };
};

export const gameRepository = {
  gamesList,
  createGame,
  getGame,
  startGame,
  saveGame,
};

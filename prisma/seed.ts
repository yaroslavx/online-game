import { GameStatus, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: {
      id: "1",
      login: "playerOneLogin",
      rating: 1000,
      passwordHash: "hash",
    },
  });
  const user2 = await prisma.user.create({
    data: {
      id: "2",
      login: "playerOneLogin",
      rating: 1000,
      passwordHash: "hash",
    },
  });
  await prisma.game.create({
    data: {
      field: Array(9).fill(null),
      id: "game-2",
      status: GameStatus.idle,
      players: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  await prisma.game.create({
    data: {
      field: Array(9).fill(null),
      id: "game-1",
      status: GameStatus.idle,
      players: {
        connect: {
          id: user2.id,
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { GameId } from "@/kernel/ids";
import { GameClient } from "@/features/game/containers/game-client";
import { getCurrentUser } from "@/entities/user/server";
import { getGameById, startGame } from "@/entities/game/server";
import { redirect } from "next/navigation";

export async function Game({ gameId }: { gameId: GameId }) {
  const user = await getCurrentUser();

  let game = await getGameById(gameId);

  if (!game || !user) {
    redirect("/");
  }

  if (user) {
    const startedGame = await startGame(gameId, user);

    if (startedGame.type === "right") {
      game = startedGame.value;
    }
  }

  return <GameClient initialGame={game} player={user} />;
}

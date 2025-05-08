import { getIdleGames } from "@/entities/game/server";
import { GamesListClient } from "@/features/games-list/containers/games-list-client";

export async function GamesList() {
  const gamesList = await getIdleGames();

  return <GamesListClient games={gamesList} />;
}

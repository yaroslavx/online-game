import { getIdleGames } from "@/entities/game/server";
import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";

export async function GamesList() {
  const gamesList = await getIdleGames();

  return (
    <Layout>
      {gamesList.map((game) => (
        <GameCard
          key={game.id}
          rating={game.creator.rating}
          login={game.creator.login}
        />
      ))}
    </Layout>
  );
}

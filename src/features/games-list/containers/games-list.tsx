import { getIdleGames } from "@/entities/game/server";
import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";
import { CreateButton } from "@/features/games-list/containers/create-button";

export async function GamesList() {
  const gamesList = await getIdleGames();

  return (
    <Layout actions={<CreateButton />}>
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

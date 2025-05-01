import { getIdleGames } from "@/entities/game/server";
import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";
import { CreateButton } from "@/features/games-list/containers/create-button";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { routes } from "@/kernel/routes";

export async function GamesList() {
  const gamesList = await getIdleGames();

  return (
    <Layout actions={<CreateButton />}>
      {gamesList.map((game) => (
        <GameCard
          key={game.id}
          rating={game.creator.rating}
          login={game.creator.login}
          actions={
            <Link href={routes.game(game.id)}>
              <Button>Join</Button>
            </Link>
          }
        />
      ))}
    </Layout>
  );
}

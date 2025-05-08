"use-client";

import { useEventSource } from "@/shared/lib/sse/client";
import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";
import { CreateButton } from "@/features/games-list/containers/create-button";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { routes } from "@/kernel/routes";
import { GameDomain } from "@/entities/game";

export function GamesListClient({
  games,
}: {
  games: GameDomain.GameIdleEntity[];
}) {
  const { data: gamesStream = games } = useEventSource<
    GameDomain.GameIdleEntity[]
  >(routes.gamesStream());

  return (
    <Layout actions={<CreateButton />}>
      {gamesStream.map((game) => (
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

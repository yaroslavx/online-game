import { getIdleGames } from "@/entities/game/server";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";

export async function GamesList() {
  const gamesList = await getIdleGames();

  return (
    <div className="flex flex-cols-2 gap-4">
      {gamesList.map((game) => (
        <Card key={game.id}>
          <CardTitle>Player: {game.creator.login}</CardTitle>
          <CardContent>Rating: {game.creator.rating}</CardContent>
        </Card>
      ))}
    </div>
  );
}

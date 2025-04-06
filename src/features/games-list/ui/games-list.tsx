import { getIdleGames } from "@/entities/game/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export async function GamesList() {
  const gamesList = await getIdleGames();

  return (
    <div className="grid grid-cols-2 gap-4">
      {gamesList.map((game) => (
        <Card key={game.id}>
          <CardHeader>
            <CardTitle>Play with: {game.creator.login}</CardTitle>
          </CardHeader>
          <CardContent>Rating: {game.creator.rating}</CardContent>
        </Card>
      ))}
    </div>
  );
}

import { db } from "@/shared/lib/db";
import { Card, CardTitle } from "@/shared/ui/card";

export default async function Home() {
  const games = await db.game.findMany();

  console.log(games);

  return (
    <div>
      {games.map((game) => (
        <Card key={game.id}>
          <CardTitle>{game.name}</CardTitle>
        </Card>
      ))}
    </div>
  );
}

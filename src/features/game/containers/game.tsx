import { GameId } from "@/kernel/ids";
import { GameLayout } from "@/features/game/ui/layout";
import { GamePlayers } from "@/features/game/ui/players";
import { GameDomain } from "@/entities/game";
import { GameStatus } from "@/features/game/ui/status";
import { GameField } from "@/features/game/ui/field";

export function Game({ gameId }: { gameId: GameId }) {
  const game: GameDomain.GameEntity = {
    id: "1",
    creator: {
      id: "1",
      login: "creatorLogin",
      rating: 1000,
    },
    field: Array(9).fill(null),
    status: "idle",
  };

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}

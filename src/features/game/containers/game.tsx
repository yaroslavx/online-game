"use client";

import { GameId } from "@/kernel/ids";
import { GameLayout } from "@/features/game/ui/layout";
import { GamePlayers } from "@/features/game/ui/players";
import { GameDomain } from "@/entities/game";
import { GameStatus } from "@/features/game/ui/status";
import { GameField } from "@/features/game/ui/field";
import { useEventSource } from "@/shared/lib/sse/client";

export function Game({ gameId }: { gameId: GameId }) {
  const { data, error } = useEventSource(`/game/${gameId}/stream`, 1);

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
    <div>
      {data}
      {error ? "Error" : null}
    </div>
  );

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}

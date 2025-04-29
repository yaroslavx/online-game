"use client";

import { GameId } from "@/kernel/ids";
import { GameLayout } from "@/features/game/ui/layout";
import { GamePlayers } from "@/features/game/ui/players";
import { GameDomain } from "@/entities/game";
import { GameStatus } from "@/features/game/ui/status";
import { GameField } from "@/features/game/ui/field";
import { useEffect, useState } from "react";

export function Game({ gameId }: { gameId: GameId }) {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const gameEvents = new EventSource(`/game/${gameId}/stream`);

    gameEvents.addEventListener("message", (message) => {
      console.log(message.data);
      setData(message.data);
    });
  }, [gameId]);

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

  return <div>{JSON.stringify(data)}</div>;

  // return (
  //   <GameLayout
  //     players={<GamePlayers game={game} />}
  //     status={<GameStatus game={game} />}
  //     field={<GameField game={game} />}
  //   />
  // );
}

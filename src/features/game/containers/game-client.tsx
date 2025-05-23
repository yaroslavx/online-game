"use client";

import { GameLayout } from "@/features/game/ui/layout";
import { GamePlayers } from "@/features/game/ui/players";
import { GameStatus } from "@/features/game/ui/status";
import { GameField } from "@/features/game/ui/field";
import { useGame } from "@/features/game/model/use-game";
import { GameDomain } from "@/entities/game";

export function GameClient({
  initialGame,
  player,
}: {
  initialGame: GameDomain.GameEntity;
  player: GameDomain.PlayerEntity;
}) {
  const { game = initialGame, step } = useGame(initialGame.id, player);

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} onCellClick={step} />}
    />
  );
}

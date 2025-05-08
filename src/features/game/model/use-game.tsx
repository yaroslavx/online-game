import { useEventSource } from "@/shared/lib/sse/client";
import { GameId } from "@/kernel/ids";
import { GameDomain } from "@/entities/game";
import { routes } from "@/kernel/routes";
import { useOptimistic, useTransition } from "react";
import { gameStepAction } from "@/features/game/actions/game-step";
import { GameStatus } from "@prisma/client";

export function useGame(gameId: GameId, player: GameDomain.PlayerEntity) {
  const { data, isPending } = useEventSource<GameDomain.GameEntity>(
    routes.gameStream(gameId),
  );

  const [isPendingTransition, startTransition] = useTransition();

  const [optimisticGame, dispatchOptimistic] = useOptimistic(
    data,
    (game, index: number) => {
      if (!game || game.status !== GameStatus.inProgress) {
        return game;
      }
      const result = GameDomain.doStep({ game, player, index });

      if (result.type === "right") {
        return result.value;
      }
      return game;
    },
  );
  const step = (index: number) => {
    startTransition(async () => {
      dispatchOptimistic(index);
      await gameStepAction({ index, gameId });
    });
  };

  return {
    game: optimisticGame,
    step,
    isPending: isPending,
    isStepPending: isPendingTransition,
  };
}

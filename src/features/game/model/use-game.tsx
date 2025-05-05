import { useEventSource } from "@/shared/lib/sse/client";
import { GameId } from "@/kernel/ids";
import { GameDomain } from "@/entities/game";
import { routes } from "@/kernel/routes";
import { useTransition } from "react";
import { gameStepAction } from "@/features/game/actions/game-step";

export function useGame(gameId: GameId) {
  const { data, isPending } = useEventSource<GameDomain.GameEntity>(
    routes.gameStream(gameId),
  );

  const [isPendingTransition, startTransition] = useTransition();

  const step = (index: number) => {
    startTransition(async () => {
      await gameStepAction({ index, gameId });
    });
  };

  return {
    game: data,
    step,
    isPending: isPending,
    isStepPending: isPendingTransition,
  };
}

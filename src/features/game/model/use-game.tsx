import { useEventSource } from "@/shared/lib/sse/client";
import { GameId } from "@/kernel/ids";
import { GameDomain } from "@/entities/game";

export function useGame(gameId: GameId) {
  const { data, error, isPending } = useEventSource<GameDomain.GameEntity>(
    `/game/${gameId}/stream`,
  );

  return { game: data, isPending };
}
